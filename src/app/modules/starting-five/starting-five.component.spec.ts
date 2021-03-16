import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StartingFiveComponent } from './starting-five.component';

describe('StartingFiveComponent', () => {
  let component: StartingFiveComponent;
  let fixture: ComponentFixture<StartingFiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
