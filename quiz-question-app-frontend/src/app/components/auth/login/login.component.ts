// import { Component } from '@angular/core';
// import { AuthService } from '../../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: false,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {
//   username = '';
//   password = '';
//   errorMessage = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   onLogin() {
//     this.authService.login({ username: this.username, password: this.password }).subscribe({
//       next: (res) => {
//         this.authService.saveToken(res.token);
//         this.router.navigate(['/quiz']); // redirect after login
//       },
//       error: () => {
//         this.errorMessage = 'Invalid username or password';
//       }
//     });
//   }
// }
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const loginData = { username: this.username, password: this.password };

    this.authService.login(loginData).subscribe({
      next: (res) => {
        // ✅ Ensure backend returns these fields: token, id, username
        this.authService.saveLoginData(res);

        // ✅ Redirect to profile page after successful login
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
