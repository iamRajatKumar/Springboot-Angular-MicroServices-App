package com.example.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entities.Question;
import com.example.repository.QuestionRepository;
import com.example.service.QuestionService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService{

    private QuestionRepository questionRepository;

    //Question create without option
    @Override
    public Question create(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public List<Question> get() {
        return questionRepository.findAll();
    }

    @Override
    public Question getOne(Long id) {
        return questionRepository.findById(id).orElseThrow(()-> new RuntimeException("Question not found!"));
    }

    @Override
    public List<Question> getQuestionOfQuiz(Long quizId) {
       return questionRepository.findByQuizId(quizId);
    }

}
