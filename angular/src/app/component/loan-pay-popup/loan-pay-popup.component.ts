import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-loan-pay-popup',
  templateUrl: './loan-pay-popup.component.html',
  styleUrls: ['./loan-pay-popup.component.css']
})
export class LoanPayPopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoanPayPopupComponent>) { }
  ngOnInit() {
  }
  cancel(){
    this.dialogRef.close(false);
  }
  confirm(){
    this.dialogRef.close(true);
  }
}
