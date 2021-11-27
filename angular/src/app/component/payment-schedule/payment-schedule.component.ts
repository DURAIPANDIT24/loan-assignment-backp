import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/service/loan.service';
import { PaymentSchedule } from 'src/app/models/paymentSchedule';
import { MatDialog } from '@angular/material/dialog';
import { LoanPayPopupComponent } from '../loan-pay-popup/loan-pay-popup.component';
import { Loan } from 'src/app/models/loan';
import * as moment from 'moment';
@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.css']
})
export class PaymentScheduleComponent implements OnInit {
  payments: PaymentSchedule[];
  loanid: string;
  spin: boolean;
  loans: Loan[] | any;
  paymentbuttonstatus: Date;
  constructor(private activatedRoute: ActivatedRoute, private loanService: LoanService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.spin = true;
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.loanid = params['loanId'];
        this.loanService.getPaymentSchedule(this.loanid).subscribe((data: any) => {
          this.spin = false;
          this.payments = data.sort(this.compare);
          this.paybuttonfunction();
        })
        this.loanService.getLoanDetails(this.loanid).subscribe((data: any) => {
          this.loans = data;

          console.log("loan", this.loans);
        })
      });
  }
  paybuttonfunction() {

    for (let i = 0; i < this.payments.length; i++) {

      if ((this.payments[i]?.paymentStatus == "PROJECTED")) {
        if (moment(this.payments[i]?.paymentDate).isBefore(this.payments[i + 1].paymentDate) && (this.payments[i]?.paymentStatus == "PROJECTED")) {

          this.paymentbuttonstatus = this.payments[i].paymentDate
          break;
        }
        else {
          this.paymentbuttonstatus = this.payments[i + 1].paymentDate
          break;
        }

      }

      else {
        this.paymentbuttonstatus = this.payments[this.payments.length - 1].paymentDate
      }
    }
  }

  getClass(paymentStatus: string) {
    var classList = '';
    if (paymentStatus == 'PROJECTED') {
      classList = 'badge badge-primary';
    } else if (paymentStatus == 'AWAITINGPAYMENT') {
      classList = 'badge badge-warning';
    } else if (paymentStatus == 'PAID') {
      classList = 'badge badge-success';
    }
    return classList;
  }

  changePaymentStatus(event: any, paymentId: any) {
    let popup = this.dialog.open(LoanPayPopupComponent);
    popup.afterClosed().subscribe(data => {
      if (data === true) {
        this.loanService.updatePaymentStatus(paymentId).subscribe(() => {
          this.ngOnInit();
        });
      }
      else {
        return data;
      }
    })
  }

  compare(a: any, b: any) {

    return <any>new Date(a.paymentDate) - <any>new Date(b.paymentDate);

  }
}
