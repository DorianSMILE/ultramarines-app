import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationEquipmentUltramarineComponent } from './authorization-equipment-ultramarine.component';

describe('AuthorizationEquipmentUltramarineComponent', () => {
  let component: AuthorizationEquipmentUltramarineComponent;
  let fixture: ComponentFixture<AuthorizationEquipmentUltramarineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizationEquipmentUltramarineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationEquipmentUltramarineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
