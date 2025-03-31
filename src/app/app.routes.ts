import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { SearchUltramarineComponent } from './pages/search-ultramarine/search-ultramarine.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { FirstConnexionComponent } from './pages/first-connexion/first-connexion.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/auth/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'search', component: SearchUltramarineComponent, canActivate: [AuthGuard] },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'admin/firstConnexion/:uuid', component: FirstConnexionComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: '**', redirectTo: 'login' }
];
