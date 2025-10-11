import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8083/auth'; // API Gateway route

  constructor(private http: HttpClient, private router: Router) {}

  // --- AUTH APIS ---
  login(user: User): Observable<any> {
    this.clearStorage();
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  signup(user: User): Observable<any> {
    this.clearStorage();
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  // --- LOCAL STORAGE HANDLING ---
  saveLoginData(response: any): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.id);
    localStorage.setItem('username', response.username);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  clearStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  logout(): void {
    this.clearStorage();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
