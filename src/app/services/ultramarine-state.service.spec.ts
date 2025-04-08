import { TestBed } from '@angular/core/testing';

import { UltramarineStateService } from './ultramarine-state.service';

describe('UltramarineStateService', () => {
  let service: UltramarineStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltramarineStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
