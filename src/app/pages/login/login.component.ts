import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
      this.authService.login(this.username, this.password).subscribe({
        next: (response: any) => {
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.errorMessage = "Erreur de connexion. Veuillez vérifier vos identifiants.";
        }
      });
    }
}
