package com.example.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.entity.User;
import com.example.repository.UserRepository;

@Service
public class ProfileService {

    @Autowired
    private UserRepository repository;

    private static final String UPLOAD_DIR = "uploads/";

    public Optional<User> getProfileById(Long id) {
        return repository.findById(id);
    }

    public Optional<User> getProfileByUsername(String username) {
        return repository.findByUsername(username);
    }

    public User updateProfile(Long id, User updatedData) {
        User existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updatedData.getName() != null)
            existing.setName(updatedData.getName());
        if (updatedData.getEmail() != null)
            existing.setEmail(updatedData.getEmail());
        if (updatedData.getPassword() != null)
            existing.setPassword(updatedData.getPassword());
        if (updatedData.getDescription() != null)
            existing.setDescription(updatedData.getDescription());
        if (updatedData.getProfilePictureUrl() != null)
            existing.setProfilePictureUrl(updatedData.getProfilePictureUrl());

        return repository.save(existing);
    }

    // ✅ Upload profile picture
    public String uploadProfilePicture(Long id, MultipartFile file) {
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            // Ensure upload directory exists
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) dir.mkdirs();

            // Save file
            String fileName = id + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.write(path, file.getBytes());

            // Update user record with file URL
            String fileUrl = "/uploads/" + fileName;
            user.setProfilePictureUrl(fileUrl);
            repository.save(user);

            return fileUrl;

        } catch (IOException e) {
            throw new RuntimeException("Error uploading file", e);
        }
    }

    // ✅ Delete profile picture
    public void deleteProfilePicture(Long id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getProfilePictureUrl() != null) {
            String filePath = user.getProfilePictureUrl().replace("/uploads/", UPLOAD_DIR);
            try {
                Files.deleteIfExists(Paths.get(filePath));
            } catch (IOException e) {
                throw new RuntimeException("Error deleting file", e);
            }
            user.setProfilePictureUrl(null);
            repository.save(user);
        }
    }
}
