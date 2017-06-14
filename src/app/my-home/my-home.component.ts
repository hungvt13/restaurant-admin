import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp ,JwtHelper} from 'angular2-jwt';


@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.css']
})
export class MyHomeComponent implements OnInit {

  token: string;
  jwtDate: any;
  jwtExpired: any;
  decodedJwt: string;
  response: string;
  api: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    //this.jwt = localStorage.getItem('id_token');
    //this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    this.token = localStorage.getItem('id_token');
    this.decodedJwt = this.jwtHelper.decodeToken(this.token);
    this.jwtDate = this.jwtHelper.getTokenExpirationDate(this.token);
    this.jwtExpired = this.jwtHelper.isTokenExpired(this.token);
   }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  _callApi(type, url) {
    this.response = null;
    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
    if (type === 'Secured') {
      // For protected routes, use AuthHttp
      this.authHttp.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
  }

}
