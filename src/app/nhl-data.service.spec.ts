import { TestBed, inject } from '@angular/core/testing';

import { NhlDataService } from './nhl-data.service';

describe('NhlDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NhlDataService]
    });
  });

  it('should be created', inject([NhlDataService], (service: NhlDataService) => {
    expect(service).toBeTruthy();
  }));
});
