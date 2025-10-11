package com.example.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.entity.User;
import com.example.service.AuthService;
import com.example.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    // ✅ Signup
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody Map<String, String> request) {
        String message = authService.signup(
                request.get("username"),
                request.get("password"),
                request.get("email"));
        return ResponseEntity.ok(Map.of("message", message));
    }

    // ✅ Login (returns token + id + username + email)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        // Validate user and generate JWT
        User user = authService.validateUser(username, password);
        String token = authService.generateToken(user.getUsername());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail()
        ));
    }

    // ✅ JWT Secret (for internal or testing use)
    @GetMapping("/secret")
    public String getJwtSecret() {
        return jwtService.getBase64Secret();
    }
}
