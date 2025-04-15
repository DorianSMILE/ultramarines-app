import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAuthorizationComponent } from './equipment-authorization.component';

describe('EquipmentAuthorizationComponent', () => {
  let component: EquipmentAuthorizationComponent;
  let fixture: ComponentFixture<EquipmentAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentAuthorizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
