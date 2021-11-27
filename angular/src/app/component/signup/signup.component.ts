import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from './MustMatch';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/service/loan.service';
import { ToastrService } from 'ngx-toastr';
import { HardcodedAuthenticationService } from 'src/app/service/hardcoded-authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  retUrl: string | any = "home";
  loggedIn: boolean;
  loading: boolean;

  constructor(private toastr: ToastrService, private loanService: LoanService, private formBuilder: FormBuilder, private router: Router, private authService: HardcodedAuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      accno: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
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
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.loanService.saveCustomer(this.registerForm.value).subscribe((data: any) => {
      if (data != null) {
        this.onFormSubmit();
      }
    })


  }
  async onFormSubmit() {
    console.log(this.registerForm.value.email)
    this.loggedIn = await this.authService.authenticate(this.registerForm.value.email, this.registerForm.value.password);
    if (this.loggedIn) {
      if (this.retUrl != null) {
        this.router.navigate([this.retUrl]);
        this.toastr.success('Register Successfull');
      } else {
        this.router.navigate(['home']);

      }
    }
    else {
      this.loading = false;
      this.toastr.error('Try Again or Register');

    }
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.toastr.success('Reset Successfull');

  }
  gotologin() {
    this.router.navigate(['login']);
  }
}
