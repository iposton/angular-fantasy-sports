import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatLeadersComponent } from './stat-leaders.component';

describe('StartingFiveComponent', () => {
  let component: StatLeadersComponent;
  let fixture: ComponentFixture<StatLeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatLeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
