import { TestBed } from '@angular/core/testing';

import { DepthService } from './depth.service';

describe('DepthService', () => {
  let service: DepthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
