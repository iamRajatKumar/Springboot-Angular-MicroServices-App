import { Component } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  standalone: false,
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.css'
})
export class QuizFormComponent {

  quiz: Quiz = {
    title: ''
  };

  constructor(private quizService: QuizService, private router: Router) { }

  onSubmit(): void {
    this.quizService.createQuiz(this.quiz).subscribe(()=>{
      alert('Quiz created successfully!');
      this.router.navigate(['/']);
    })
  }
}
