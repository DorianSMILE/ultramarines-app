import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetRoleComponent } from '../get-role/get-role.component';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../models/user.dto';

@Component({
  selector: 'app-create-user',
  imports: [CommonModule, ReactiveFormsModule, GetRoleComponent],
  standalone: true,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [null, Validators.required]
    });
  }

  onRoleSelected(roleId: number): void {
    this.userForm.patchValue({ roleId });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (result: UserDTO) => {
          console.log('Utilisateur créé avec succès', result);
        },
        error: (err: any) => console.error('Erreur lors de la création de l\'utilisateur', err)
      });
    }
  }

}
