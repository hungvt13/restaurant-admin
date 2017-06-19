import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp ,JwtHelper} from 'angular2-jwt';
import { Http } from '@angular/http';
import { TableService } from '../table.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {

  jwt: string;
  jwtDate: any;
  jwtExpired: any;
  decodedJwt: string;
  response: string;
  api: string;
  jwtHelper: JwtHelper = new JwtHelper();

  private form: FormGroup;
  private itemName;
  private itemPrice;
  private itemUID;
  public mess;

  constructor(public fb: FormBuilder, public router: Router, public http: Http, public authHttp: AuthHttp, public tableService: TableService) { 
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt);
    this.jwtDate = this.jwtHelper.getTokenExpirationDate(this.jwt);
    this.jwtExpired = this.jwtHelper.isTokenExpired(this.jwt);

    this.form = this.fb.group({
      itemName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      itemPrice: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{2}')])],
      itemUID: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{2}')])],
    });

  }

  private onSubmit(item: any): void {
    console.log('Reactive Form Data: ');
    console.log(item);
    //Adds item information to the databse

    this.tableService.createProduct(item).subscribe(
      suc => {
        //console.log(JSON.stringify(suc.message));
        this.mess = JSON.stringify(suc.message);
        this.tableService.refreshMenuListService();
      },
      err => {console.log(err);}
    );
  }
  ngOnInit() {
  }

}
