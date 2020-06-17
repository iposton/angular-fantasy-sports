import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleComponent } from './team-schedule.component';

describe('TeamScheduleComponent', () => {
  let component: TeamScheduleComponent;
  let fixture: ComponentFixture<TeamScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
