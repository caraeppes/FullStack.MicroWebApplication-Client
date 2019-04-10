import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  login(user: User): any {
    return this.http.post('/server/login', user, null);
  }

  logout(user: User): any {
    return this.http.post('server/logout', user, null);
  }

  findUsers() {
    return this.http.get('server/users');
  }
}
