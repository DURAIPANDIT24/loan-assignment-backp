import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loan-apply-popup',
  templateUrl: './loan-apply-popup.component.html',
  styleUrls: ['./loan-apply-popup.component.css']
})
export class LoanApplyPopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoanApplyPopupComponent>,private router:Router) { }
  ngOnInit() {
  }
  async cancel(){
    this.dialogRef.close(true);
   await this.router.navigate(['/home'])
  }

}
