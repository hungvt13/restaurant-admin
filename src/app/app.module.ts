import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';

import { environment } from './environment';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { routes } from './router/router.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuardService } from './auth-guardn.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthService} from './auth.service';
import {TableService} from './table.service';

import {  Http, RequestOptions } from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { CreateTableComponent } from './create-table/create-table.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}



@NgModule({
  declarations: [
    AppComponent,
    MyHomeComponent,
    NavBarComponent,
    LogInComponent,
    SignUpComponent,
    CreateTableComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      useHash: false
    }),
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    AuthGuardService,
    AuthService,
    TableService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
