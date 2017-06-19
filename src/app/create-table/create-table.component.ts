import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  JwtHelper} from 'angular2-jwt';
import { TableService } from '../table.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  jwt: string;
  jwtDate: any;
  jwtExpired: any;
  decodedJwt: string;
  response: string;
  jwtHelper: JwtHelper = new JwtHelper();

  private form: FormGroup;
  private tableNo;
  public mess;
  public mess2;
  private isCreate: boolean = false;
  private isDelete: boolean = false;



  constructor(public fb: FormBuilder ,tableServie: TableService, public router: Router, public tableService: TableService) { 
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt);
    this.jwtDate = this.jwtHelper.getTokenExpirationDate(this.jwt);
    this.jwtExpired = this.jwtHelper.isTokenExpired(this.jwt);

    this.form = this.fb.group({
      tableNo: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
    });
  }

  private onSubmit(item: any): void {
    console.log('Reactive Form Data: ');
    item['isActive'] = false;
    item['command'] = 1;
    console.log(item);
    
    this.tableService.modifyTable(item).subscribe(
      suc => {
        //console.log(JSON.stringify(suc.message));
        this.mess = JSON.stringify(suc.message);
        this.tableService.refreshTableListService();
        setTimeout(()=>{this.mess = ""},2000);
      },
      err => {console.log(err);}
    );

  }

  private deleteTable(item){
    item['command'] = 2;
    console.log(item);
    this.tableService.modifyTable(item).subscribe(
      suc => {
        //console.log(JSON.stringify(suc.message));
        this.mess2 = JSON.stringify(suc.message);
        this.tableService.refreshTableListService();
        setTimeout(()=>{this.mess = ""},2000);
      },
      err => {console.log(err);}
    );
  }

  private onCreate(){
    this.isDelete = false;
    this.isCreate = true;
  }

  private onDelete(){
    this.isCreate = false;
    this.isDelete = true;
  }

  ngOnInit() {
  }

}

