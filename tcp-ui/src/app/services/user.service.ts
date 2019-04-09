import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders( { 'Content-type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get('/server/api/users');
  }

  getUser(id: number){
    return this.http.get('/server/api/users/' + id);
  }

  createUser(user){
    let body = JSON.stringify(user);
    return this.http.post('/server/api/users', body, httpOptions);
  }

}
