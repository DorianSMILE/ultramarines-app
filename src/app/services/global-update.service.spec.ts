import { TestBed } from '@angular/core/testing';

import { GlobalUpdateService } from './global-update.service';

describe('GlobalUpdateService', () => {
  let service: GlobalUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
