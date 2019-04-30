import {Injectable} from '@angular/core';
<<<<<<< HEAD
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
=======
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable, Subject, Subscription} from 'rxjs';
>>>>>>> c8981368c64facfcf63fdccb2b17699e9fa7f5fa

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = '/server/users';
  user: User;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUsersSubscribedToChannel(channelId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/findByChannel/${channelId}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  joinChannel(username: string, channel: string): Observable<any> {
    let user: User;
    this.getUserByUsername(username).subscribe(data => {
      user = data;
    });
    return this.http.put(`${this.usersUrl}/${username}/join/?channel=${channel}`, user, httpOptions);
  }

  leaveChannel(username: string, channel: string): Observable<any> {
    let user: User;
    this.getUserByUsername(username).subscribe(data => {
      user = data;
    });
    return this.http.put(`${this.usersUrl}/${username}/leave/?channel=${channel}`, user, httpOptions);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/findusername/${username}`);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }

  loginUser(username: string): Observable<any> {
    let user: User;
    this.getUserByUsername(username).subscribe(data => {
      user = data;
    });
    return this.http.put(`${this.usersUrl}/login/${username}`, user, httpOptions);

  }

  logoutUser(username: string): Observable<any> {
    let user: User;
    this.getUserByUsername(username).subscribe(data => {
      user = data;
    });
    return this.http.put(`${this.usersUrl}/logout/${username}`, user, httpOptions);
  }

<<<<<<< HEAD
  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    return this.http.delete<User>(`${this.usersUrl}/${id}`, httpOptions);
  }
=======
>>>>>>> c8981368c64facfcf63fdccb2b17699e9fa7f5fa
}
