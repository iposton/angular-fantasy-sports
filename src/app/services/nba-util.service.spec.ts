import { TestBed } from '@angular/core/testing';

import { NbaUtilService } from './nba-util.service';

describe('NbaUtilService', () => {
  let service: NbaUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
