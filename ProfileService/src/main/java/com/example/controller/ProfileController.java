package com.example.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.User;
import com.example.service.ProfileService;

@RestController
@RequestMapping("/profile")
// @CrossOrigin("*")
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
}