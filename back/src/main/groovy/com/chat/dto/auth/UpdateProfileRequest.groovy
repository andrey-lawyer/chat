package com.chat.dto.auth

import jakarta.validation.constraints.Size
import lombok.Getter

@Getter
class UpdateProfileRequest {

    String newUsername;

    @Size(min = 4, message = "Password must be at least 4 characters long")
    String newPassword;

}
