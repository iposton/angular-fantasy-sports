import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingPitcherComponent } from './starting-pitcher.component';

describe('StartingPitcherComponent', () => {
  let component: StartingPitcherComponent;
  let fixture: ComponentFixture<StartingPitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingPitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingPitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
