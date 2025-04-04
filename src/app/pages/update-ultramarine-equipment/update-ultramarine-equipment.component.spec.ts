import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUltramarineEquipmentComponent } from './update-ultramarine-equipment.component';

describe('UpdateUltramarineEquipmentComponent', () => {
  let component: UpdateUltramarineEquipmentComponent;
  let fixture: ComponentFixture<UpdateUltramarineEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUltramarineEquipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUltramarineEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
