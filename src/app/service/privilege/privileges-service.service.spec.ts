import { TestBed } from '@angular/core/testing';

import { PrivilegesServiceService } from './privileges-service.service';

describe('PrivilegesServiceService', () => {
  let service: PrivilegesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivilegesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
