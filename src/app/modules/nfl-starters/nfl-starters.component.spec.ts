import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NflStartersComponent } from './nfl-starters.component';

describe('NflStartersComponent', () => {
  let component: NflStartersComponent;
  let fixture: ComponentFixture<NflStartersComponent>;

  beforeEach(async(() => {
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
