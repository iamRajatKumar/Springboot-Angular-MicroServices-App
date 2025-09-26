package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.User;
import com.example.repository.UserRepository;
import com.netflix.discovery.converters.Auto;

@Service
public class ProfileService {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private UserRepository userRepository;
    
    
}
