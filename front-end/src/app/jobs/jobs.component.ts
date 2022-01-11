import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobsResponse } from './jobs-response';
import { Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface Job {
  id: string;
  userId: number;
  title: string;
  description: string;
  tags: string;
  location: string;
  status: string;
  actions: string;
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class JobsComponent implements OnInit {
  info: any;
  constructor(private token: TokenStorageService, private http: HttpClient) { }

  applications_data: Job[] = [];
  columnsToDisplay = ['id', 'title', 'status'];
  expandedElement: Job | null;
  ngOnInit(): void {
    this.info = {
      token: this.token.getToken()
    };
    this.jobData().subscribe(
     (data:any) => {
        this.applications_data = data;
      }
    );
  }

  jobData(): Observable<JobsResponse> {
    return this.http.get<JobsResponse>('http://localhost:8080/func/jobs', httpOptions);
  }
}