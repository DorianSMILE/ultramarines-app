import { TestBed } from '@angular/core/testing';

import { EquipmentAuthorizationService } from './equipment-authorization.service';

describe('EquipmentAuthorizationService', () => {
  let service: EquipmentAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
