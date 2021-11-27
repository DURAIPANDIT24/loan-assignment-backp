import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-approved-popup',
  templateUrl: './loan-approved-popup.component.html',
  styleUrls: ['./loan-approved-popup.component.css']
})
export class LoanApprovedPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoanApprovedPopupComponent>, private router: Router) { }
  ngOnInit() {
  }
  async cancel() {
    this.dialogRef.close(true);

  }

}
