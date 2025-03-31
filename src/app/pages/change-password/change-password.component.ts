import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  uuid: string | null = null;
  message: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.changePasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.uuid = params['uuid'];
      if (!this.uuid) {
        this.error = 'uuid non fourni.';
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid && this.uuid) {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      this.userService.changePassword(this.uuid, newPassword)
        .pipe(first())
        .subscribe(
          (response: any) => {
            this.message = 'Mot de passe modifié avec succès !';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          (err: any) => {
            console.error('Une erreur est survenue lors de la modification du mot de passe', err);
            this.error = err.error || 'Une erreur est survenue lors de la modification du mot de passe';
          }
        );
    }
  }
}
