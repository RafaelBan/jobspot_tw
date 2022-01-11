import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveFirstName(data.firstName);
        this.tokenStorage.saveUserName(data.username);
        this.tokenStorage.saveRole(data.role);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.goToPage("/home");
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
