import { Component } from '@angular/core';
import { Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-details',
  standalone: false,
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.css'
})
export class QuizDetailsComponent {

  quiz? : Quiz;
  //after adding options
  question: Question[]= [];

  constructor(
      private route: ActivatedRoute,
      private quizService: QuizService,
      private questionService: QuestionService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quizService.getQuizById(id).subscribe(data => {
      this.quiz = data;
    });

    this.questionService.getQuestionByQuizId(id).subscribe((data) => {
      this.question = data;
      console.log('Question with Options: ',this.question);
    });
  }

  checkAnswer(isCorrect: boolean | undefined): void {
    if (isCorrect) {
      alert('Correct answer!');
    } else {
      alert('Wrong answer. Try again!');
    }
  }

}
