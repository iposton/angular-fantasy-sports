import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesterdayResultsComponent } from './yesterday-results.component';

describe('YesterdayResultsComponent', () => {
  let component: YesterdayResultsComponent;
  let fixture: ComponentFixture<YesterdayResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesterdayResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesterdayResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
