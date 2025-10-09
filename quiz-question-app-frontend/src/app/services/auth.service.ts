import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model'; // adjust import if needed

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8083/auth'; // API Gateway route

  constructor(private http: HttpClient, private router: Router) {}

  // --- AUTH APIS ---
  login(user: User): Observable<any> {
    this.clearToken(); // clear stale token before login
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  signup(user: User): Observable<any> {
    this.clearToken(); // clear stale token before signup
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  // --- TOKEN HANDLING ---
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

  // --- LOGOUT HANDLING ---
  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']); // ✅ redirect user to login page
  }

  // --- AUTH STATE ---
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
