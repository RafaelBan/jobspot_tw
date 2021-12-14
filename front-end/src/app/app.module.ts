import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    JobsComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
