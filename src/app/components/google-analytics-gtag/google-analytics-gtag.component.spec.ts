import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAnalyticsGtagComponent } from './google-analytics-gtag.component';

describe('GoogleAnalyticsGtagComponent', () => {
  let component: GoogleAnalyticsGtagComponent;
  let fixture: ComponentFixture<GoogleAnalyticsGtagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAnalyticsGtagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAnalyticsGtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
