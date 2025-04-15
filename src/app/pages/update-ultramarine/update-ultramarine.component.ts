import { Component, Output, Input, OnInit, EventEmitter, OnChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalUpdateService } from '@services/global-update.service';
import { UltramarineDTO } from '@models/ultramarine.dto';

@Component({
  selector: 'app-update-ultramarine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-ultramarine.component.html',
  styleUrl: './update-ultramarine.component.scss'
})
export class UpdateUltramarineComponent implements OnInit, OnChanges {

  @Input() ultramarine!: UltramarineDTO;
  @Output() infoUpdate: EventEmitter<Partial<UltramarineDTO>> = new EventEmitter<Partial<UltramarineDTO>>();
  @Output() cancelUpdate: EventEmitter<void> = new EventEmitter<void>();

  isPatching = false;
  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private globalUpdateService: GlobalUpdateService) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      grade: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.ultramarine) {
      this.updateForm.patchValue({
        name: this.ultramarine.name,
        grade: this.ultramarine.grade
      });
    }
    this.updateForm.valueChanges.subscribe(val => {
      if (!this.isPatching) {
        this.infoUpdate.emit(val);
      }
    });
  }

  ngOnChanges(): void {
    if (this.ultramarine) {
      this.isPatching = true;
      this.updateForm.patchValue({
        name: this.ultramarine.name,
        grade: this.ultramarine.grade
      });
      setTimeout(() => this.isPatching = false, 0);
    }
  }

  updateInfo(): void {
    if (this.updateForm.valid && this.ultramarine) {
      const updatedDTO: UltramarineDTO = {
        id: this.ultramarine.id,
        name: this.updateForm.value.name,
        grade: this.updateForm.value.grade,
        equipments: null
      };
      this.globalUpdateService.updateGlobal(updatedDTO).subscribe({
        next: updated => {
          console.log('Mise à jour globale réussie (infos) :', updated);
          this.infoUpdate.emit({ name: updated.name, grade: updated.grade });
        },
        error: err => console.error('Erreur lors de la mise à jour globale (infos) :', err)
      });
    }
  }

  onCancel(): void {
    this.cancelUpdate.emit();
  }

}
