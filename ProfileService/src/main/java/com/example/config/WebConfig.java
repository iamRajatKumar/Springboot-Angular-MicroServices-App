package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Maps URLs like http://localhost:8083/uploads/... to your local folder
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:D:/VsCode/Springboot Angular MicroServices App/uploads/");
    }
}
