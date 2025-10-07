package com.example.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.User;
import com.example.repository.UserRepository;

@Service
public class ProfileService {
    
    @Autowired
    private UserRepository repository;

    public Optional<User> getProfileById(Long id) {
        return repository.findById(id);
    }

    public Optional<User> getProfileByUsername(String username) {
        return repository.findByUsername(username);
    }

    public User updateProfile(Long id,User updatedData) {
       User existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
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
}
