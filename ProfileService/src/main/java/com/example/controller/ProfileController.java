package com.example.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.entity.User;
import com.example.service.ProfileService;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileService service;

    @GetMapping("/{id}")
    public Optional<User> getProfile(@PathVariable Long id) {
        return service.getProfileById(id);
    }

    @GetMapping("/username/{username}")
    public Optional<User> getProfileByUsername(@PathVariable String username) {
        return service.getProfileByUsername(username);
    }

    @PutMapping("/update/{id}")
    public User updateProfile(@PathVariable Long id, @RequestBody User user) {
        return service.updateProfile(id, user);
    }

    // // ✅ Upload profile picture
    // @PostMapping("/upload/{id}")
    // public ResponseEntity<String> uploadProfilePicture(@PathVariable Long id,
    // @RequestParam("file") MultipartFile file) {
    // String url = service.uploadProfilePicture(id, file);
    // return ResponseEntity.ok(url);
    // }

    @PostMapping("/upload/{id}")
    public ResponseEntity<Map<String, String>> uploadProfilePicture(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        String filePath = service.uploadProfilePicture(id, file); // ✅ Correct method call
        Map<String, String> response = new HashMap<>();
        response.put("url", filePath);
        return ResponseEntity.ok(response);
    }

    // ✅ Delete profile picture
    @DeleteMapping("/delete-picture/{id}")
    public ResponseEntity<String> deleteProfilePicture(@PathVariable Long id) {
        service.deleteProfilePicture(id);
        return ResponseEntity.ok("Profile picture deleted successfully!");
    }
}
