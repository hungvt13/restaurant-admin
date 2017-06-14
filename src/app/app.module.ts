import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { routes } from './router/router.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuardService } from './auth-guardn.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthService} from './auth.service';



@NgModule({
  declarations: [
    AppComponent,
    MyHomeComponent,
    NavBarComponent,
    LogInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
  ],
  providers: [AuthGuardService, ...AUTH_PROVIDERS, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
