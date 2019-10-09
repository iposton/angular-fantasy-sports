import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchesComponent } from './touches.component';

describe('TouchesComponent', () => {
  let component: TouchesComponent;
  let fixture: ComponentFixture<TouchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
