import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { SignupComponent } from './component/signup/signup.component';
import { CustomerLoanDetailsComponent } from './component/customer-loan-details/customer-loan-details.component';
import { MenuComponent } from './component/menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ApplyloanComponent } from './component/applyloan/applyloan.component';
import { CustomerdetailsComponent } from './component/customerdetails/customerdetails.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import { PaymentScheduleComponent } from './component/payment-schedule/payment-schedule.component';
import { LoanPayPopupComponent } from './component/loan-pay-popup/loan-pay-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoanApplyPopupComponent } from './component/loan-apply-popup/loan-apply-popup.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AdminComponent } from './component/admin/admin.component';
import { LoanApprovedPopupComponent } from './component/loan-approved-popup/loan-approved-popup.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    CustomerLoanDetailsComponent,
    MenuComponent,
    FooterComponent,
    ApplyloanComponent,
    CustomerdetailsComponent,
    LoginComponent,
    PaymentScheduleComponent,
    LoanPayPopupComponent,
    LoanApplyPopupComponent,
    AdminComponent,
    LoanApprovedPopupComponent,

  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    ToastrModule.forRoot(),
     // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
