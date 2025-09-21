import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  username = '';
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.authService.signup({ 
      username: this.username, 
      password: this.password, 
      email: this.email 
        }).subscribe({
        next: (res) => {
          alert(res.message || 'Signup successful! Please login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.message = 'Signup failed. Try again.';
        }
      });
    }
}
//error in the code Signup not working we will fix it later
