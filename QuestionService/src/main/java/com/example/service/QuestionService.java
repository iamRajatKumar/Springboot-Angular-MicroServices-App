package com.example.service;

import java.util.List;

import com.example.entities.Question;

public interface QuestionService {

    Question create(Question question);

    List<Question> get();

    Question getOne(Long id);

    List<Question> getQuestionOfQuiz(Long quizId);
}
