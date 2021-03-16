import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamRankComponent } from './team-rank.component';

describe('TeamRankComponent', () => {
  let component: TeamRankComponent;
  let fixture: ComponentFixture<TeamRankComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
