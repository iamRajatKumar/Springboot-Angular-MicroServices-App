import { Component } from '@angular/core';
import { Question } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-question-list',
  standalone: false,
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent {

  questions : Question[] = [ ];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe(data => {
      console.log(data);
      this.questions = data;
    });
  }
}
