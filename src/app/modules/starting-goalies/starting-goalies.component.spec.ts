import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StartingGoaliesComponent } from './starting-goalies.component';

describe('StartingGoaliesComponent', () => {
  let component: StartingGoaliesComponent;
  let fixture: ComponentFixture<StartingGoaliesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingGoaliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingGoaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
