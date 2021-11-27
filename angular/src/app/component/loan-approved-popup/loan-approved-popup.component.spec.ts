import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApprovedPopupComponent } from './loan-approved-popup.component';

describe('LoanApprovedPopupComponent', () => {
  let component: LoanApprovedPopupComponent;
  let fixture: ComponentFixture<LoanApprovedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanApprovedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanApprovedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
