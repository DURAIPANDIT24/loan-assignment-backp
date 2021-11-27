import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPayPopupComponent } from './loan-pay-popup.component';

describe('LoanPayPopupComponent', () => {
  let component: LoanPayPopupComponent;
  let fixture: ComponentFixture<LoanPayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanPayPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
