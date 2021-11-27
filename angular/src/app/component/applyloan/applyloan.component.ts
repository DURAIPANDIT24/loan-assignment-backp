import { Component, OnInit, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan';
import { HardcodedAuthenticationService } from 'src/app/service/hardcoded-authentication.service';
import { LoanService } from 'src/app/service/loan.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { LoanApplyPopupComponent } from '../loan-apply-popup/loan-apply-popup.component';
@Component({
  selector: 'app-applyloan',
  templateUrl: './applyloan.component.html',
  styleUrls: ['./applyloan.component.css']
})

export class ApplyloanComponent implements OnInit {
  loanForm: FormGroup | any;
  customerId: string;
  loan: Loan = new Loan();
  submitted = false;
  today = new Date();
  range: number;
  date: Date;
  paymentSchedule: number = 0;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = moment(this.now).format('YYYY-MM-DD');
  maxDate = moment(this.now, "YYYY-MM-DD").add(10, "days").format('YYYY-MM-DD');

  constructor(private formBuilder: FormBuilder, private loanService: LoanService, private router: Router, private authService: HardcodedAuthenticationService, public dialog: MatDialog) { }

  ngOnInit() {

    this.customerId = this.authService.getCustomerId();
    this.loanForm = this.formBuilder.group({
      customerId: [{ value: this.customerId, disabled: true }],
      loanAmount: ['', [Validators.required, Validators.max(10000000), Validators.min(1000)]],
      tradeDate: ['', Validators.required],
      startDate: ['', Validators.required],
      loanDuration: ['', Validators.required],
      maturityDate: [{ value: new Date(), disabled: true }],
      interestRate: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      paymentFrequency: ['', [Validators.required]],
      paymentSchedule: [{ value: 0, disabled: true }],
      paymentTerm: ['', [Validators.required]],
      projectedInterest: [{ value: 0, disabled: true }],
    });
  }

  get f() { return this.loanForm.controls; }


  setMaturityDate(event: any) {
    var range = (event.target.value) * 12;
    var startDate = this.loanForm.get('startDate').value;
    console.log("fdfdf", startDate)
    var date = new Date(startDate);

    if (range != 0) {
      this.loanForm.patchValue({
        maturityDate: new Date(date.setMonth(date.getMonth() + range)).toISOString().substring(0, 10)
      });
    }
  }
  setPaymentInterest(event: any) {
    console.log("inter", event.target.value)
    if (event.target.value != 0) {
      this.loanForm.patchValue({
        interestRate
          : event.target.value
      });
    }
  }

  calculatepaymentSchedule(event: any) {
    var totalMonths = parseInt(this.loanForm.get('loanDuration').value) * 12;
    if (event.target.value == "Monthly") {
      this.paymentSchedule = totalMonths;
    } else if (event.target.value == "Quarterly") {
      this.paymentSchedule = totalMonths / 3;
    } else if (event.target.value == "Half Yearly") {
      this.paymentSchedule = totalMonths / 6;
    } else if (event.target.value == "Yearly") {
      this.paymentSchedule = totalMonths / 12;
    }
    this.loanForm.patchValue({
      paymentSchedule: this.paymentSchedule
    });
  }

  calculateprojectedInterest(event: any) {

    var value = event.target.value;
    var principal = this.loanForm.get('loanAmount').value;
    var totalYears = this.loanForm.get('loanDuration').value;
    var interestRate = this.loanForm.get('interestRate').value;
    var paymentSchedule = this.loanForm.get('paymentSchedule').value;
    if (value != undefined) {
      var interestAmount: number | any = 0;
      for (var i = 1; i <= paymentSchedule; i++) {
        interestAmount = interestAmount + (principal * (totalYears / paymentSchedule) * interestRate) / 100;
      }
    }
    this.loanForm.patchValue({
      projectedInterest: interestAmount
    });
  }
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.loanForm.invalid) {
      return;
    }
    this.loan.customerId = this.loanForm.get('customerId').value;
    this.loan.loanAmount = this.loanForm.get('loanAmount').value;
    this.loan.tradeDate = new Date(this.loanForm.get('tradeDate').value);
    this.loan.startDate = new Date(this.loanForm.get('startDate').value);
    this.loan.loanDuration = this.loanForm.get('loanDuration').value;
    this.loan.maturityDate = new Date(this.loanForm.get('maturityDate').value);
    this.loan.interestRate = this.loanForm.get('interestRate').value;
    this.loan.paymentFrequency = this.loanForm.get('paymentFrequency').value;
    this.loan.paymentSchedule = this.loanForm.get('paymentSchedule').value;
    this.loan.paymentTerm = this.loanForm.get('paymentTerm').value;
    this.loan.projectedInterest = this.loanForm.get('projectedInterest').value;
    this.loanService.saveLoan(this.loan).subscribe(data => {
    });
    this.dialog.open(LoanApplyPopupComponent);
    this.resetForm();
  }
  async resetForm() {
    this.loanForm.reset();
    Object.keys(this.loanForm.controls).forEach(key => {
      this.loanForm.controls[key].setErrors(null)
    });
    this.submitted = false;
    this.loanForm.patchValue({
      customerId: this.customerId
    });
  }
  formatDate(input: string) {
    var datePart = input.match(/\d+/g),
      year = datePart![0],
      month = datePart![1],
      day = datePart![2];
    return day + '-' + month + '-' + year;
  }
}
