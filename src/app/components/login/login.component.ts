import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../feature/users/services/auth.service';

//import { authService } from '../../feature/shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(@Inject('AuthService') public auth: AuthService) {} // Injecting authService

  login() {
    // Call the login method from authService
    this.auth.login();
  }
}
