import { TestBed, inject } from '@angular/core/testing';

import { TomorrowService } from './tomorrow.service';

describe('TomorrowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TomorrowService]
    });
  });

  it('should be created', inject([TomorrowService], (service: TomorrowService) => {
    expect(service).toBeTruthy();
  }));
});
