import { Component, OnInit, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { MyHomeComponent } from '../my-home/my-home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthGuardService } from '../auth-guardn.service';
import { LogInComponent } from '../log-in/log-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';




export const routes: Routes = [
  {path:'',         component: LogInComponent },
  {path:'login',  component: LogInComponent },
  {path:'signup',  component: SignUpComponent },
  {path:'home',   component: MyHomeComponent, canActivate: [AuthGuardService] },
  {path:'**', component: LogInComponent},
];

