import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // adjust path

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'http://localhost:8083/profile';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // JWT saved after login
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl, { headers: this.getHeaders() });
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user, { headers: this.getHeaders() });
  }

  uploadProfilePicture(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl + '/upload-picture', formData, {
      headers: this.getHeaders()
    }) as Observable<string>;
  }

  deleteProfilePicture(): Observable<string> {
    return this.http.delete(this.apiUrl + '/delete-picture', {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }
}
