import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PositionCardComponent } from './position-card.component';

describe('PositionCardComponent', () => {
  let component: PositionCardComponent;
  let fixture: ComponentFixture<PositionCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
