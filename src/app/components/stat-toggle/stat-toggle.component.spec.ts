import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatToggleComponent } from './stat-toggle.component';

describe('StatToggleComponent', () => {
  let component: StatToggleComponent;
  let fixture: ComponentFixture<StatToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatToggleComponent ]
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
