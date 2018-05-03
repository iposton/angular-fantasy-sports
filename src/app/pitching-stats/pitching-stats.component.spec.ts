import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchingStatsComponent } from './pitching-stats.component';

describe('PitchingStatsComponent', () => {
  let component: PitchingStatsComponent;
  let fixture: ComponentFixture<PitchingStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchingStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
