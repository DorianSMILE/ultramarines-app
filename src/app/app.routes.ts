import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateUltramarineComponent } from './pages/create-ultramarine/create-ultramarine.component';
import { SearchUltramarineComponent } from './pages/search-ultramarine/search-ultramarine.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateUltramarineComponent },
  { path: 'search', component: SearchUltramarineComponent },
];
