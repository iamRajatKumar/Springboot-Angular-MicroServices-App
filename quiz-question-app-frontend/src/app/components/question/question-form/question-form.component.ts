import { Component } from '@angular/core';
import { Question } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  standalone: false,
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css'
})
export class QuestionFormComponent {

  question: Question = {
    question: '',
    quizId: 0,
    options: []
  }

  selectedCorrectIndex: number = 0;

  constructor(private questionService: QuestionService,
    private router: Router) { }

  addOption() {
    this.question.options?.push({ text: '' });
  }

  removeOption(index: number) {
    this.question.options?.splice(index, 1);
  }

  onSubmit() {
    this.question.options?.forEach((opt, index) => {
      opt.correct = (index === this.selectedCorrectIndex);
    });

    this.questionService.createQuestion(this.question).subscribe(() => {
      alert('Question created successfully');

      this.selectedCorrectIndex = 0;
      this.addOption();
      this.router.navigate(['/question']);
    });

  }

}
