import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { JobResponse } from './job-response';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

export interface ApplicationInformation {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    location: string;
    description: string;
  }


@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  info: any;
  job_id: any;
  error: any;
  application_information_object: ApplicationInformation;
  file: File;
  constructor(private token: TokenStorageService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUserName()
    };
    this.job_id = window.location.href.split("/").pop();
    this.http.post<JobResponse>('http://localhost:8080/func/application/create', {"job_id":this.job_id, "username":this.info.username}, httpOptions).subscribe(
        (data: any) => {
           this.application_information_object = data;
        },
        (err: any) => {
            this.error = err.error;
        }
    );
  }

  pdfInputChange(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
  }

  apply(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('job_id', this.job_id);
    formData.append('user_id', this.application_information_object.userId);
    this.http.post<HttpEvent<any>>('http://localhost:8080/func/apply', formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    setTimeout(() => 
    {
        this.router.navigate(['/home']);
    }, 500);
  }
}