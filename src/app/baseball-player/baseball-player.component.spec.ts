import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseballPlayerComponent } from './baseball-player.component';

describe('BaseballPlayerComponent', () => {
  let component: BaseballPlayerComponent;
  let fixture: ComponentFixture<BaseballPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseballPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseballPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
