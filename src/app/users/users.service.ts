import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { UserObj, UsersObj, User, TokenObj } from './user'; 
 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Token': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private usersUrl: string = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';  // URL to web api
  private tokenUrl: string = 'https://frontend-test-assignment-api.abz.agency/api/v1/token';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /** GET users from the server */
  getUsers (usersPerPage, pageToLoad): Observable<UsersObj> {
    const url = `${this.usersUrl}?page=${pageToLoad}&count=${usersPerPage}`;
    return this.http.get<UsersObj>(url);
  }

  /** GET user by id */
  getUser(id: number): Observable<UserObj> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<UserObj>(url);
  }

  /** GET user by id */
  createtUser(userData: User, token: string): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Token', token);
    return this.http.post<UserObj>(this.usersUrl, userData, httpOptions);
  }

  /* Get token for creating new user */
  getToken (): Observable<TokenObj> {
    return this.http.get<TokenObj>(this.tokenUrl);
  }
}
