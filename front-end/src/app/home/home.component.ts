import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TokenStorageService } from '../auth/token-storage.service';
import { HomeResponse } from './home-response';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface Application {
  id: string;
  title: string;
  description: string;
  applicant: string;
  location: string;
  date: string;
  status: string;
}

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
  ]
})
export class HomeComponent implements OnInit {
  applications_data: Application[] = [];
  columnsToDisplay = ['id', 'title', 'status', 'date'];
  expandedElement: Application | null;
  info: any;
  jobCount: string;
  userCount: string;
  recruiterCount: string;
  constructor(private token: TokenStorageService, private http: HttpClient, private router: Router) { }

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
      first_name: this.token.getFirstName(),
      username: this.token.getUserName()
    };
    this.homeData(this.info.username).subscribe(
      data => {
        this.jobCount = data.jobCount;
        this.userCount = data.userCount;
        this.recruiterCount = data.recruiterCount;
        this.applications_data = data.applicationsResponseList;
      }
    );
    const job_openings = document.getElementById("jobOpenings");
    this.animateValue(job_openings, 0, this.jobCount, 1000);
    const people_searching = document.getElementById("peopleSearching");
    this.animateValue(people_searching, 0, this.userCount, 1000);
    const recruiters_searching = document.getElementById("recruiterSearching");
    this.animateValue(recruiters_searching, 0, this.recruiterCount, 1000);
  }

  homeData(username: String): Observable<HomeResponse> {
    return this.http.post<HomeResponse>('http://localhost:8080/func/home', {"username":username}, httpOptions);
  }

  delete(id: string) {
    const formData: FormData = new FormData();
    formData.append('application_id', id);
    this.http.post<string>('http://localhost:8080/func/application/delete', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    setTimeout(() => 
    {
        window.location.reload();
    }, 500);
  }
}
