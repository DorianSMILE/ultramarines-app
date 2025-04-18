import { MATERIAL_IMPORTS } from '@app/material';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { CreateUltramarineComponent } from '@pages/create-ultramarine/create-ultramarine.component';
import { SearchUltramarineComponent } from '@pages/search-ultramarine/search-ultramarine.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HomeComponent,
    CreateUltramarineComponent,
    SearchUltramarineComponent,
    ...MATERIAL_IMPORTS
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ultramarines-app';
}
