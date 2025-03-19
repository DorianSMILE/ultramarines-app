import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUltramarineComponent } from './search-ultramarine.component';

describe('SearchUltramarineComponent', () => {
  let component: SearchUltramarineComponent;
  let fixture: ComponentFixture<SearchUltramarineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchUltramarineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUltramarineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
