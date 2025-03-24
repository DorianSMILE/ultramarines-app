import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { SearchUltramarineComponent } from './pages/search-ultramarine/search-ultramarine.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchUltramarineComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
