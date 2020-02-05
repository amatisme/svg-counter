import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgTimerComponent } from './svg-timer.component';

describe('SvgTimerComponent', () => {
  let component: SvgTimerComponent;
  let fixture: ComponentFixture<SvgTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
