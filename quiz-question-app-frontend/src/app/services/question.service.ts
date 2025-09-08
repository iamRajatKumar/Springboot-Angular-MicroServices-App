import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseURL = `${environment.apiUrl}/question`;
  
  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseURL);
  }

  getQuestionByQuizId(quizId: number): Observable<Question[]>{
    return this.http.get<Question[]>(`${this.baseURL}/quiz/${quizId}`);
  }

  createQuestion(question: Question): Observable<Question>{
    return this.http.post<Question>(this.baseURL, question);
  }
}
