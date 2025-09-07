package com.example.config;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

@Configuration
public class JwtConfig {

    @Bean
    public SecretKey jwtSecretKey() {
        // Generate a secure key for HS256 signing
        return Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }
}
