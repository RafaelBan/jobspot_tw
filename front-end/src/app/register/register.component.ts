import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage: any;
  private signupInfo: SignUpInfo;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {

    this.signupInfo = new SignUpInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
