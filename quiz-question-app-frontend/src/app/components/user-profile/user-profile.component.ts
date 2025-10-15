import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserProfileService } from '../../services/user-profile.service';
import { AuthService } from '../../services/auth.service'; // ✅ Import AuthService

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    name: '',
    description: '',
    profilePictureUrl: ''
  };

  selectedFile: File | null = null;
  message: string = '';

  constructor(
    private profileService: UserProfileService,
    private authService: AuthService // ✅ Inject AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // ✅ Use helper to get logged-in user ID

    if (!userId) {
      this.message = 'Please log in to view your profile.';
      return;
    }

    this.loadProfile(); // ✅ Only load profile if logged in
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.message = 'Failed to load profile.';
      }
    });
  }

  updateProfile(): void {
    this.profileService.updateProfile(this.user).subscribe({
      next: (updated) => {
        this.user = updated;
        this.message = 'Profile updated successfully!';
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.message = 'Failed to update profile.';
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

 uploadPicture(): void {
  if (!this.selectedFile) {
    this.message = 'Please select a file first.';
    return;
  }

  this.profileService.uploadProfilePicture(this.selectedFile).subscribe({
    next: (url: string) => {
      this.user.profilePictureUrl = `${url}?t=${new Date().getTime()}`;
      this.message = 'Profile picture uploaded successfully!';
      this.selectedFile = null;
    },
    error: (err) => {
      console.error('Error uploading picture:', err);
      this.message = 'Failed to upload picture.';
    }
  });
}


  deletePicture(): void {
    this.profileService.deleteProfilePicture().subscribe({
      next: () => {
        this.user.profilePictureUrl = '';
        this.message = 'Profile picture deleted successfully!';
      },
      error: (err) => {
        console.error('Error deleting picture:', err);
        this.message = 'Failed to delete picture.';
      }
    });
  }
}
