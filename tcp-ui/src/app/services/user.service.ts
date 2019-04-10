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
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/api/users',
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    );
  }

  getUser(id: number){
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/api/users/' + id,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    );
  }

  createUser(user){
    let body = JSON.stringify(user);
    return this.http.post('/server/api/users', body, httpOptions);
  }

}
