import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // adjust import if needed

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8083/auth'; // API Gateway route

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    // clear stale token before login
    this.clearToken();
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  signup(user: User): Observable<any> {
    // clear stale token before signup
    this.clearToken();
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  logout(): void {
    this.clearToken();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
