import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importuj HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component'; // Importuj LoginComponent
import { FormsModule } from '@angular/forms'; // Dodaj ten import
import { ProjectsComponent } from './Projects/projects.component';
import { UsersComponent } from './Users/users.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HomePageMasterComponent } from './Home/home-maste.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './Calendar/calendar.component';
import { ReportsComponent } from './Reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // Dodaj LoginComponent do deklaracji
    ProjectsComponent,
    HomePageMasterComponent,
    UsersComponent,
    CalendarComponent,
    ReportsComponent
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule // Dodaj FormsModule tutaj
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
