import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8083/auth'; // API Gateway route

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // ✅ Check if running in browser
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

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
    if (this.isBrowser()) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.id);
      localStorage.setItem('username', response.username);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserId(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('userId');
    }
    return null;
  }

  getUsername(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('username');
    }
    return null;
  }

  clearStorage(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    }
  }

  logout(): void {
    this.clearStorage();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
