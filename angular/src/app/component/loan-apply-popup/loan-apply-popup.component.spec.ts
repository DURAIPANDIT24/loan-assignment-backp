import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplyPopupComponent } from './loan-apply-popup.component';

describe('LoanApplyPopupComponent', () => {
  let component: LoanApplyPopupComponent;
  let fixture: ComponentFixture<LoanApplyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanApplyPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanApplyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
