package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.User;
import com.example.service.ProfileService;
import com.netflix.discovery.converters.Auto;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // @GetMapping
    // public ResponseEntity<User> getProfile(Authentication authentication) {
    //      String username = authentication.getName();
    // return ResponseEntity.ok(profileService.getUserByUsername(username));;


    
}
