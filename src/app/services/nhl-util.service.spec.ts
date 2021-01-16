import { TestBed } from '@angular/core/testing';

import { NhlUtilService } from './nhl-util.service';

describe('NhlUtilService', () => {
  let service: NhlUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhlUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
