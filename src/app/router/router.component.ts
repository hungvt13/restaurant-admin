import { Component, OnInit, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { MyHomeComponent } from '../my-home/my-home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

export const routes: Routes = [
  {path:'',         component: MyHomeComponent },
  {path:'**', redirectTo: ''},
];

export const router = RouterModule.forRoot(routes);
export const appRoutingProviders: any [] = [];
