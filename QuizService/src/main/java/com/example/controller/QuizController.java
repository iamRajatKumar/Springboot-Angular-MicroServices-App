package com.example.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Quiz;
import com.example.services.QuizService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/quiz")
@AllArgsConstructor
public class QuizController {

    private QuizService quizService;

    //create
    @PostMapping
    public Quiz create(@RequestBody Quiz quiz){
        return quizService.add(quiz);
    }

    //getAll
    @GetMapping
    public List<Quiz> get(){
        return quizService.get();
    }

    //getOne
    @GetMapping("/{id}")
        public Quiz getOne(@PathVariable Long id){
            return quizService.get(id);
        }
    
}
