import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUltramarineComponent } from './create-ultramarine.component';

describe('CreateUltramarineComponent', () => {
  let component: CreateUltramarineComponent;
  let fixture: ComponentFixture<CreateUltramarineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUltramarineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUltramarineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
