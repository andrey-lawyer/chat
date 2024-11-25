package com.chat.service

import com.chat.dto.auth.UserCurrentResponseDto
import com.chat.model.User
import com.chat.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.server.ServerWebExchange
import org.springframework.web.server.WebSession
import reactor.core.publisher.Mono
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.GrantedAuthority;

@Service
class UserService {

    private final UserRepository userRepository;
    private final MessageService messageService;
    private final PasswordEncoder passwordEncoder;

       @Autowired
       UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, MessageService messageService) {
           this.userRepository = userRepository;
           this.passwordEncoder = passwordEncoder;
           this.messageService= messageService;
        }

    Mono<UserCurrentResponseDto> getCurrentUser() {
        return ReactiveSecurityContextHolder.getContext()
                .map(context -> {
                    Authentication authentication = context.getAuthentication();
                    print(authentication)
                    String username = authentication.getName();
                    String role = authentication.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .map(auth -> auth.replace("ROLE_", ""))
                            .findFirst()
                            .orElse("USER");

                    return new UserCurrentResponseDto(username, role);
                });
    }


    Mono<Boolean> isUserAuthenticated() {
        return ReactiveSecurityContextHolder.getContext()
                .map(context -> context.getAuthentication().isAuthenticated())
                .defaultIfEmpty(false);
    }


    Mono<User> updateUserProfile(String newUsername, String newPassword) {
        return getCurrentAuthenticatedUser()
                .flatMap(currentUser -> validateAndUpdateProfile(currentUser, newUsername, newPassword));
    }

    private Mono<User> getCurrentAuthenticatedUser() {
        return ReactiveSecurityContextHolder.getContext()
                .map(context -> context.getAuthentication().getPrincipal())
                .cast(UserDetails.class)
                .flatMap(userDetails -> userRepository.findByUsername(userDetails.getUsername()));
    }



    private Mono<User> validateAndUpdateProfile(User currentUser, String newUsername, String newPassword) {
        // If a new username is specified, update it
        if (newUsername != null && !newUsername.isBlank()) {
            String oldUsername = currentUser.getUsername();
            currentUser.setUsername(newUsername);

            // Update all messages containing the old username
            return messageService.updateMessagesForUser(oldUsername, newUsername)
            // Next, update the password if it is specified
                    .then(updatePasswordIfNeeded(currentUser, newPassword))
                    .flatMap(updatedUser -> invalidateSessionAndReturn(updatedUser));
        }

        // If the username is not changed, update only the password, if necessary.
        return updatePasswordIfNeeded(currentUser, newPassword)
                .flatMap(updatedUser -> invalidateSessionAndReturn(updatedUser));
    }

// If a new password is specified, update it
    private Mono<User> updatePasswordIfNeeded(User currentUser, String newPassword) {
        if (newPassword != null && !newPassword.isBlank()) {
            currentUser.setPassword(passwordEncoder.encode(newPassword));
        }
        return userRepository.save(currentUser); // Save the updated user (both username and password)
    }

// End the current session and return the updated user
    private Mono<User> invalidateSessionAndReturn(User updatedUser) {
        return Mono.deferContextual(context -> {
            // Get ServerWebExchange from context
            ServerWebExchange exchange = context.getOrDefault(ServerWebExchange.class, null);
            if (exchange != null) {
                // End the current session
                return exchange.getSession()
                        .flatMap(WebSession::invalidate) // End the  session
                        .thenReturn(updatedUser); // Возвращаем обновлённого пользователя
            } else {
                // If ServerWebExchange is not available, throw an error
                return Mono.error(new IllegalStateException("ServerWebExchange not available in context"));
            }
        }) as Mono<User>;
    }


    String getUserRole(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .findFirst()
                .orElse("ROLE_NOT_FOUND");
    }
}

