import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatToggleComponent } from './stat-toggle.component';

describe('StatToggleComponent', () => {
  let component: StatToggleComponent;
  let fixture: ComponentFixture<StatToggleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [StatToggleComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
