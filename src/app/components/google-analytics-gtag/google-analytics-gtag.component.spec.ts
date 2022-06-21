import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GoogleAnalyticsGtagComponent } from './google-analytics-gtag.component';

describe('GoogleAnalyticsGtagComponent', () => {
  let component: GoogleAnalyticsGtagComponent;
  let fixture: ComponentFixture<GoogleAnalyticsGtagComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [GoogleAnalyticsGtagComponent],
    teardown: { destroyAfterEach: false }
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
