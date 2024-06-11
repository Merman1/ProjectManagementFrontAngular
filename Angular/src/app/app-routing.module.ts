import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { ProjectsComponent } from './Projects/projects.component';
import { AuthGuard } from './Services/AuthGuard';
import { UsersComponent } from './Users/users.component';
import { HomePageMasterComponent } from './Home/home-maste.component';
import { CalendarComponent } from './Calendar/calendar.component';
import { ReportsComponent } from './Reports/reports.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'homePageMaster', component: HomePageMasterComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

