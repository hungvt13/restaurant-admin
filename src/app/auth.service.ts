import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Set our Auth0 credentials
  lock = new Auth0Lock('YOUR-AUTH0-CLIENT-ID', 'YOUR-AUTH0-DOMAIN.auth0.com');

  constructor(private router: Router) {
    // Capture the user credentials when the user has succesfully logged in
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.router.navigateByUrl('/home');
      });

      this.lock.hide();
    });
  }

  // Display the lock login box
  login() {
    this.lock.show();
  }

  // Logout the user
  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/login');
  }

  // Check whether the user is logged in or not
  loggedIn() {
    return tokenNotExpired();
  }

}