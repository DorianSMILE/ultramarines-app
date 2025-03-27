import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUltramarineComponent } from './update-ultramarine.component';

describe('UpdateUltramarineComponent', () => {
  let component: UpdateUltramarineComponent;
  let fixture: ComponentFixture<UpdateUltramarineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUltramarineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUltramarineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
