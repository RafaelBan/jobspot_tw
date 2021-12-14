import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TokenStorageService } from '../auth/token-storage.service';
import { HomeResponse } from './home-response';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'job_name', 'date'];
  expandedElement: PeriodicElement | null;
  info: any;
  jobCount: string;
  userCount: string;
  recruiterCount: string;
  constructor(private token: TokenStorageService, private http: HttpClient) { }

  animateValue(obj: any, start: any, end: any, duration: any) {
    let startTimestamp: any = null;
    const step = (timestamp: any) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };
    this.homeData().subscribe(
      data => {
        this.jobCount = data.jobCount;
        this.userCount = data.userCount;
        this.recruiterCount = data.recruiterCount;
      }
    );
    const job_openings = document.getElementById("jobOpenings");
    this.animateValue(job_openings, 0, this.jobCount, 1000);
    const people_searching = document.getElementById("peopleSearching");
    this.animateValue(people_searching, 0, this.userCount, 1000);
    const recruiters_searching = document.getElementById("recruiterSearching");
    this.animateValue(recruiters_searching, 0, this.recruiterCount, 1000);
  }

  homeData(): Observable<HomeResponse> {
    return this.http.get<HomeResponse>('http://localhost:8080/func/home', httpOptions);
  }
}

export interface PeriodicElement {
  job_name: string;
  id: number;
  date: string;
  location: string;
  description: string;
  applicant_name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    job_name: 'Internship Basic Software Development',
    date: '11/15/2021 - 5:27 PM',
    location: 'Timisoara',
    description: `Here is job description.
    test`,
    applicant_name: 'Rafael Ban',
  },
  {
    id: 2,
    job_name: 'Internship Mechanical Engineering',
    date: '11/15/2021 - 5:27 PM',
    location: 'Timisoara',
    description: `Job description
test
another test`,
    applicant_name: 'Rafael Ban',
  },
  {
    id: 3,
    job_name: 'Internship for HW',
    date: '11/15/2021 - 5:27 PM',
    location: 'Timisoara',
    description: `job description`,
    applicant_name: 'Rafael Ban',
  },
  {
    id: 4,
    job_name: 'Internship as Software Developer for Powertrain Control',
    date: '11/15/2021 - 5:27 PM',
    location: 'Timisoara',
    description: `another job description`,
    applicant_name: 'Rafael Ban',
  },
];
