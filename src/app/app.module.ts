import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { router, appRoutingProviders } from './router/router.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MyHomeComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    router,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
