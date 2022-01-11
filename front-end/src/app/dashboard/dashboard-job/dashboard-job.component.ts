import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TokenStorageService } from '../../auth/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { JobsResponse } from '../../jobs/jobs-response';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

export interface Application {
    id: string;
    userId: string;
    name: string;
    email: string;
    cvPath: string;
    status: string;
}  

export interface Job {
    id: string;
    userId: number;
    title: string;
    description: string;
    tags: string;
    location: string;
    status: string;
    actions: string;
    applications: Application[];
  }

@Component({
  selector: 'app-dashboard-job',
  templateUrl: './dashboard-job.component.html',
  styleUrls: ['./dashboard-job.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardJobComponent implements OnInit {
  info: any;
  job: Job;
  job_id: any;
  error: any;
  columnsToDisplay = ['id', 'name', 'email', 'status'];
  expandedElement: Job | null;

  constructor(private token: TokenStorageService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUserName(),
      role: this.token.getRole()
    };
    this.job_id = window.location.href.split("/").pop();
    this.jobData().subscribe(
        (data:any) => {
           this.job = data;
         },
        (err: any) => {
            this.error = err.error;
        }
    );
  }

  jobData(): Observable<JobsResponse> {
    const formData: FormData = new FormData();
    formData.append('job_id', this.job_id);
    return this.http.post<JobsResponse>('http://localhost:8080/func/recruiter/job/details', formData);
  }

  openCv(application_id: any) { 
    window.open("http://localhost:8081/" + application_id + ".pdf");
  }

  modifyApplication(application_id: string, status: string) {
    const formData: FormData = new FormData();
    formData.append('application_id', application_id);
    formData.append('status', status);
    this.http.post<JobsResponse>('http://localhost:8080/func/application/modify', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    setTimeout(() => 
    {
        window.location.reload();
    }, 500);
  }

  onUpdate() {
    this.http.post<JobsResponse>('http://localhost:8080/func/job/update', this.job).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    setTimeout(() => 
    {
        window.location.reload();
    }, 500);
  }

  onDelete() {
    const formData: FormData = new FormData();
    formData.append('job_id', this.job_id);
    this.http.post<JobsResponse>('http://localhost:8080/func/job/delete', formData).subscribe(
      (res) => {
        setTimeout(() => 
        {
            this.router.navigate(['/dashboard']);
        }, 500);
      },
      (err) => {
        this.error = err.error;
      }
    );
  }
}
