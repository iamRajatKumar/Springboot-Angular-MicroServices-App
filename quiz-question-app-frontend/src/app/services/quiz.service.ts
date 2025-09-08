import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseURL = `${environment.apiUrl}/quiz`;

  //Hardcoded URl removed
  //private baseUrl='http://localhost:8083/quiz';

  constructor( private http: HttpClient) { }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseURL);
  }

  getQuizById(id: number): Observable<Quiz>{
    return this.http.get<Quiz>(`${this.baseURL}/${id}`);
  }

  createQuiz(quiz: Quiz): Observable<Quiz>{
    return this.http.post<Quiz>(this.baseURL, quiz);
  }
}
