import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingLineComponent } from './starting-line.component';

describe('StartingLineComponent', () => {
  let component: StartingLineComponent;
  let fixture: ComponentFixture<StartingLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
