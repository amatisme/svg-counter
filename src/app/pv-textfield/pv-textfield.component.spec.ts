import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvTextfieldComponent } from './pv-textfield.component';

describe('PvTextfieldComponent', () => {
  let component: PvTextfieldComponent;
  let fixture: ComponentFixture<PvTextfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvTextfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvTextfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
