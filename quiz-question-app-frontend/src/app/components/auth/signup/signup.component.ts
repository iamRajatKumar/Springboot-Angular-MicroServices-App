import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']  // ✅ corrected
})

export class SignupComponent {
  username = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSignup() {
    this.authService.signup({
      username: this.username,
      password: this.password,
      email: this.email
    }).subscribe({
      next: () => {
        const snackRef = this.snackBar.open(
          'Signup successful! Please login.',
          'Close',
          {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );

        // ✅ redirect after snackbar closes
        snackRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
      error: () => {
        this.snackBar.open(
          'Signup failed. Try again.',
          'Close',
          {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
      }
    });
  }
}


  //Normal code when we don't want to use snackbar
  // onSignup() {
  //   this.authService.signup({ 
  //     username: this.username, 
  //     password: this.password, 
  //     email: this.email 
  //       }).subscribe({
  //       next: (res) => {
  //         alert(res.message || 'Signup successful! Please login.');
  //         this.router.navigate(['/login']);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.message = 'Signup failed. Try again.';
  //       }
  //     });
  //   }
//All bugs fixed and snackbar added successfully
