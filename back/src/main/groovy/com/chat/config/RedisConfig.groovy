package com.chat.config

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory
import org.springframework.data.redis.connection.RedisConnectionFactory

import org.springframework.data.redis.core.ReactiveRedisTemplate
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.session.data.redis.config.annotation.web.server.EnableRedisWebSession
import org.springframework.web.reactive.config.EnableWebFlux



@Configuration
@EnableWebFlux
@EnableRedisRepositories
@EnableRedisWebSession(maxInactiveIntervalInSeconds = 7200)
class RedisConfig {

    @Bean
    RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(factory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return redisTemplate;
    }

    @Bean
    ReactiveRedisTemplate<String, Object> reactiveRedisTemplate(ReactiveRedisConnectionFactory factory) {

        RedisSerializationContext<String, Object> serializationContext =
                RedisSerializationContext.<String, Object>newSerializationContext(new StringRedisSerializer())
                        .hashKey(new StringRedisSerializer())
                        .hashValue(new GenericJackson2JsonRedisSerializer())
                        .build();

        return new ReactiveRedisTemplate<>(factory, serializationContext);
    }

//    --- using headers - not cookies ----

//    @Bean
//    WebSessionIdResolver webSessionIdResolver() {
//        HeaderWebSessionIdResolver sessionIdResolver = new HeaderWebSessionIdResolver();
//        sessionIdResolver.setHeaderName("X-AUTH-TOKEN");
//        return sessionIdResolver;
//    }

}