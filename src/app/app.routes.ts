import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUltramarineComponent } from './pages/create-ultramarine/create-ultramarine.component';
import { SearchUltramarineComponent } from './pages/search-ultramarine/search-ultramarine.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUltramarineComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchUltramarineComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
