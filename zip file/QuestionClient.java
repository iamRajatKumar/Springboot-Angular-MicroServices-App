package com.example.services;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.entities.Question;

//@FeignClient(url = "http://localhost:8082", value = "Question-Client")

//now feign client will check service id instead of URL
@FeignClient(name = "QUESTION-SERVICE")
public interface QuestionClient {

    //call method
    @GetMapping("/question/quiz/{quizId}")
    List<Question> getQuestionOfQuiz(@PathVariable Long quizId);
}
