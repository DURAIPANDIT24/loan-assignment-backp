import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { LoanService } from 'src/app/service/loan.service';
import { LoanApprovedPopupComponent } from '../loan-approved-popup/loan-approved-popup.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loanid: string | any;
  private loanUrl = 'http://localhost:8080/loan/';

  constructor(private http: HttpClient, private loanService: LoanService, private toastr: ToastrService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  loandId() {
    this.loanService.updateLoanStatus(this.loanid).subscribe(() => {
      this.dialog.open(LoanApprovedPopupComponent);

    });
  }

}
