import { Component, OnInit, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { MyHomeComponent } from '../my-home/my-home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthGuardService } from '../auth-guardn.service';
import { LogInComponent } from '../log-in/log-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { CreateTableComponent } from '../create-table/create-table.component';
import { SelectTableComponent } from '../select-table/select-table.component';
import { CreateMenuComponent } from '../create-menu/create-menu.component';
import { TableDetailsComponent } from '../table-details/table-details.component';
import { ReceiptViewComponent } from '../receipt-view/receipt-view.component';





export const routes: Routes = [
  {path:'',         component: LogInComponent },
  {path:'login',  component: LogInComponent },
  {path:'signup',  component: SignUpComponent },
  {path:'home',   component: MyHomeComponent, canActivate: [AuthGuardService] },
  {path:'create-table',   component: CreateTableComponent, canActivate: [AuthGuardService] },
  {path:'create-menu',   component: CreateMenuComponent, canActivate: [AuthGuardService] },
  {path:'select-table',   component: SelectTableComponent, canActivate: [AuthGuardService] },
  {path:'table-details/:id',   component: TableDetailsComponent, canActivate: [AuthGuardService]},
  {path:'receipt/:id',   component: ReceiptViewComponent, canActivate: [AuthGuardService]},
  {path:'**', redirectTo: ''},
];

