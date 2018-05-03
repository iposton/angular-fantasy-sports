import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomorrowResultsComponent } from './tomorrow-results.component';

describe('TomorrowResultsComponent', () => {
  let component: TomorrowResultsComponent;
  let fixture: ComponentFixture<TomorrowResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomorrowResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomorrowResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
