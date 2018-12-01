import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { PositionsObj } from './positions'; 

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  
  private usersUrl: string = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /** GET positions from the server */
  getUsers (): Observable<PositionsObj> {
    return this.http.get<PositionsObj>(this.usersUrl);
  }

}
