package com.example.service;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.entity.User;
import com.example.repository.UserRepository;


@Service
public class ProfileService {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found" + username));
    }
    
    public User updateUserProfile(String username, String email, User updatedUser) {
        User user = getUserByUsername(username);
        
        if(updatedUser.getName() != null){
            user.setName(updatedUser.getName());
        }

        user.setDescription(updatedUser.getDescription());

        if(updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()){
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        return userRepository.save(user);
    }

    public String uploadProfilePicture(String username, MultipartFile file ) {
        User user = getUserByUsername(username);

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String original= Path.of(file.getOriginalFilename() == null ? "file" : file.getOriginalFilename()).getFileName().toString();
            String fileName = username + "_" + System.currentTimeMillis() + "_" + original;
            String filePath = UPLOAD_DIR + fileName;
            file.transferTo(Paths.get(filePath));
            String fileUrl = "/uploads/" + fileName;
            user.setProfilePictureUrl(fileUrl);
            userRepository.save(user);
            return fileUrl;

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload profile picture", e);
        }   
    }

    // Delete picture file and clear URL column
    public void deleteProfilePicture(String username) {
        User user = getUserByUsername(username);
        String url = user.getProfilePictureUrl();
        if (url != null && !url.isBlank()) {
            // expected url like "/uploads/xxx" -> map to uploads/xxx on disk
            String filePath = url.replaceFirst("^/+", ""); // remove leading slash
            File file = new File(filePath);
            if (file.exists()) {
                file.delete();
            }
            user.setProfilePictureUrl(null);
            userRepository.save(user);
        }
    }


}
