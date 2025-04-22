import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationUltramarineListComponent } from './authorization-ultramarine-list.component';

describe('AuthorizationUltramarineListComponent', () => {
  let component: AuthorizationUltramarineListComponent;
  let fixture: ComponentFixture<AuthorizationUltramarineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizationUltramarineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationUltramarineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
