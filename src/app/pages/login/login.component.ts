import { MATERIAL_IMPORTS } from '@app/material';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
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
