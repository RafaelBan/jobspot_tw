import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobsResponse } from '../jobs/jobs-response';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: any = {};
  info: any;
  error: any;
  user: User = {
    email: "",
    firstName: "",
    lastName: "",
    username: ""
  };
  updateFailed = false;

  constructor(private token: TokenStorageService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUserName()
    };
    const formData: FormData = new FormData();
    formData.append('username', this.info.username);
    this.http.post<JobsResponse>('http://localhost:8080/func/user', formData).subscribe(
      (data:any) => {
        this.user = data;
        this.user.username = this.info.username;
      },
      (err: any) => {
        this.error = err.error;
     }
    );
  }

  onUpdate() {
    this.http.post<JobsResponse>('http://localhost:8080/func/user/update', this.user).subscribe(
      (data:any) => {
        this.updateFailed = false;
      },
      (err: any) => {
        this.error = err.error;
        this.updateFailed = true;
     }
    );
  }
}
