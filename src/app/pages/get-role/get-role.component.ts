import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { RoleDTO } from '../models/role.dto';

@Component({
  selector: 'app-get-role',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './get-role.component.html',
  styleUrl: './get-role.component.scss'
})
export class GetRoleComponent implements OnInit {
  roles: RoleDTO[] = [];

  @Input() label: string = 'Rôle :';
  @Output() roleSelected = new EventEmitter<number>();

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: (roles: RoleDTO[]) => {
          console.log('Roles reçus :', roles);
          this.roles = roles;
        },
      error: (err: any) => console.error('Erreur lors de la récupération des rôles', err)
    });
  }

  onSelectRole(event: Event): void {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    this.roleSelected.emit(selectedId);
  }

}
