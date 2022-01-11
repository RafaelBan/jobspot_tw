import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { ApplyComponent } from './jobs/apply/apply.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardJobComponent } from './dashboard/dashboard-job/dashboard-job.component';
import { CreateJobComponent } from './dashboard/create-job/create-job.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'jobs/apply/:id', component: ApplyComponent},
  { path: 'dashboard/job/:id', component: DashboardJobComponent},
  { path: 'dashboard/create', component: CreateJobComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
