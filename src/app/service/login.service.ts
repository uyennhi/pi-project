import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthToken } from '../Component/model/auth.model';
import { serverUrl } from '../Component/common/constrains';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  /**
   * Send request to authentication user
   * 
   * @param username
   * @param password
   */
  login(username: string, password: string): Observable<AuthToken>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('mclam:mclam')
      })
    };
    const body = 'client_id=mclam&client_secret=mclam&grant_type=password&' +
      'username='+ username + '&password=' + password;

    return this.http.post<AuthToken>(serverUrl + 'oauth/token', body, httpOptions);
  }

  /**
   * Send request to refresh token
   * 
   * @param refresh_token
   */
  refreshToken(refresh_token: string): Observable<AuthToken> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('mclam:mclam')
      })
    };
    const body = 'client_id=mclam&client_secret=mclam&' +
      'grant_type=refresh_token&refresh_token=' + refresh_token;

    return this.http.post<AuthToken>(serverUrl + 'oauth/token', body, httpOptions);
  }

  /**
   * Function logout (remove token)
   */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  /**
   * Function check access token already exists
   */
  isLoggedIn(): boolean {
    return (localStorage.getItem('access_token') === null) ? false : true;
  }
}