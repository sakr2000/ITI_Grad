import { TestBed } from '@angular/core/testing';

import { FieldJobService } from './FieldJob.service';

describe('GroupService', () => {
  let service: FieldJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
