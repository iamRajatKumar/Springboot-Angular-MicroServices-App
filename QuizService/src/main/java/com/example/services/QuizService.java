package com.example.services;

import java.util.List;

import com.example.entities.Quiz;

public interface QuizService {

    Quiz add(Quiz quiz);
    List<Quiz> get();
    Quiz get(Long id);
}
