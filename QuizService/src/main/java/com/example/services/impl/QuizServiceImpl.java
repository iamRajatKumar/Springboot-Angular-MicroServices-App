package com.example.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.entities.Quiz;
import com.example.repository.QuizRepository;
import com.example.services.QuestionClient;
import com.example.services.QuizService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QuizServiceImpl implements QuizService{

    private QuizRepository quizRepository;

    private QuestionClient questionClient;

    @Override
    public Quiz add(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public List<Quiz> get() {
        // return quizRepository.findAll();
        List<Quiz> quizzes = quizRepository.findAll();

        List<Quiz> newQuizList = quizzes.stream().map(quiz -> {
            quiz.setQuestion(questionClient.getQuestionOfQuiz(quiz.getId()));
        return quiz;
        }).collect(Collectors.toList());
        return newQuizList;
    }

    @Override
    public Quiz get(Long id) {
        // return quizRepository.findById(id).orElseThrow( ()-> new RuntimeException("Quiz not Found!"));
        Quiz quiz = quizRepository.findById(id).orElseThrow( ()-> new RuntimeException("Quiz not Found!"));
        quiz.setQuestion(questionClient.getQuestionOfQuiz(quiz.getId()));
        return quiz;
    }

}
