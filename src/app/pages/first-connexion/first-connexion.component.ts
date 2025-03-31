import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-first-connexion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './first-connexion.component.html',
  styleUrl: './first-connexion.component.scss'
})
export class FirstConnexionComponent implements OnInit {
  message: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const uuid = params['uuid'];
      if (uuid) {
        this.userService.firstConnexion(uuid).pipe(first()).subscribe(
          response => {
            this.message = response;
            this.router.navigate(['/changePassword'], { queryParams: { uuid: uuid } });
          },
          err => {
            this.error = err.error || 'Une erreur est survenue';
          }
        );
      } else {
        this.error = 'uuid non fourni dans l’URL.';
      }
    });
  }
}
