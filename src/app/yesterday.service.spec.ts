import { TestBed, inject } from '@angular/core/testing';

import { YesterdayService } from './yesterday.service';

describe('YesterdayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YesterdayService]
    });
  });

  it('should be created', inject([YesterdayService], (service: YesterdayService) => {
    expect(service).toBeTruthy();
  }));
});
