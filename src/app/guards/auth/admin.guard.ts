import { inject } from '@angular/core';
import { Router, UrlTree, CanActivateFn } from '@angular/router';
import { AuthService } from '@services/auth-service.service';

export const AdminGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.parseUrl('/login');
  }

  const currentUser = authService.getCurrentUser();
  if (currentUser && currentUser.roleName === 'ADMIN') {
    return true;
  }
  return router.parseUrl('/not-authorized');
};
