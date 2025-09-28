package com.example.controller;

import com.example.entity.User;
import com.example.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public ResponseEntity<User> getProfile(Authentication authentication) {
        String username = authentication.getName(); // ✅ comes from JWT subject
        return ResponseEntity.ok(profileService.getUserByUsername(username));
    }

    @PutMapping
    public ResponseEntity<User> updateProfile(Authentication authentication,
                                              @RequestBody User updatedUser) {
        String username = authentication.getName();
        return ResponseEntity.ok(profileService.updateUserProfile(username, updatedUser));
    }

    @PostMapping("/upload-picture")
    public ResponseEntity<String> uploadProfilePicture(Authentication authentication,
                                                       @RequestParam("file") MultipartFile file) {
        String username = authentication.getName();
        String url = profileService.uploadProfilePicture(username, file);
        return ResponseEntity.ok(url);
    }

    @DeleteMapping("/delete-picture")
    public ResponseEntity<String> deleteProfilePicture(Authentication authentication) {
        String username = authentication.getName();
        profileService.deleteProfilePicture(username);
        return ResponseEntity.ok("Profile picture deleted successfully");
    }
}
