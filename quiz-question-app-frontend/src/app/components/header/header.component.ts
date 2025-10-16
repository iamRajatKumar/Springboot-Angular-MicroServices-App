import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private profileService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.profileService.getProfile(+userId).subscribe({
        next: (data) => {
          // ✅ Append timestamp to avoid caching old image
          this.user = {
            ...data,
            profilePictureUrl: data.profilePictureUrl
              ? `${data.profilePictureUrl}?t=${new Date().getTime()}`
              : ''
          };
        },
        error: (err) => console.error('Error loading user:', err)
      });
    }
  }

    logout(): void {
    this.authService.logout();
    alert('You have been logged out successfully.');
    this.router.navigate(['/login']);
  }
}
