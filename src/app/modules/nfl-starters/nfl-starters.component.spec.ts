import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NflStartersComponent } from './nfl-starters.component';

describe('NflStartersComponent', () => {
  let component: NflStartersComponent;
  let fixture: ComponentFixture<NflStartersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NflStartersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NflStartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
