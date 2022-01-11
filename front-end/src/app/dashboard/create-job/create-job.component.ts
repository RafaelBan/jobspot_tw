import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { JobsResponse } from '../../jobs/jobs-response';
import { Router } from '@angular/router';


export interface Job {
    title: string;
    description: string;
    tags: string;
    location: string;
    status: string;
    username: string;
  }

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  form: any = {};
  info: any;
  job: Job = {
    title: "",
    description: "",
    tags: "",
    location: "",
    status: "",
    username: ""
  };
  error: any;
  creationFailed = false;

  constructor(private token: TokenStorageService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      role: this.token.getRole(),
      username: this.token.getUserName()
    };
  }

  onSubmit() {
    this.job.username = this.info.username;
    this.job.title = this.form.title;
    this.job.description = this.form.description;
    this.job.tags = this.form.tags;
    this.job.location = this.form.location;
    this.job.status = this.form.status;
    this.http.post<JobsResponse>('http://localhost:8080/func/job/create', this.job).subscribe(
      (res) => {
            this.creationFailed = false;
            setTimeout(() => 
            {
                this.router.navigate(['/dashboard']);
            }, 500);
      },
      (err) => {
            this.error = err.error.message;
            this.creationFailed = true;
      }
    );
  }
}
