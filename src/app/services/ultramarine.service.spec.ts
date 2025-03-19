import { TestBed } from '@angular/core/testing';

import { UltramarineService } from './ultramarine.service';

describe('UltramarineService', () => {
  let service: UltramarineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltramarineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
