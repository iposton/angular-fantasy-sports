import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StartingPitcherComponent } from './starting-pitcher.component';

describe('StartingPitcherComponent', () => {
  let component: StartingPitcherComponent;
  let fixture: ComponentFixture<StartingPitcherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [StartingPitcherComponent],
    teardown: { destroyAfterEach: false }
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
