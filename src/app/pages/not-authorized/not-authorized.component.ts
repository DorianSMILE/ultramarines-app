import { MATERIAL_IMPORTS } from '@app/material';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-authorized',
  imports: [CommonModule, ...MATERIAL_IMPORTS],
  standalone: true,
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.scss'
})
export class NotAuthorizedComponent {

}
