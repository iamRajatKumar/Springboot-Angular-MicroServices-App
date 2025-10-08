import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'http://localhost:8083/profile'; // API Gateway → Profile microservice

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // ✅ Fetch profile by logged-in user ID
  getProfile(): Observable<User> {
    const userId = localStorage.getItem('userId'); // stored at login
    return this.http.get<User>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() });
  }

  // ✅ Update profile
  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${user.id}`, user, { headers: this.getHeaders() });
  }

  // ✅ Upload profile picture
  uploadProfilePicture(file: File): Observable<string> {
    const userId = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload/${userId}`, formData, {
      headers: this.getHeaders()
    }) as Observable<string>;
  }

  // ✅ Delete profile picture
  deleteProfilePicture(): Observable<string> {
    const userId = localStorage.getItem('userId');
    return this.http.delete(`${this.apiUrl}/delete-picture/${userId}`, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }
}
