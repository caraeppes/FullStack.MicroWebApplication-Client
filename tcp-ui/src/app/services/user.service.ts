import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable, Subject, Subscription} from "rxjs";
import {SessionStorageService} from "ngx-webstorage";
import {PrivateChannel} from "../models/private-channel";

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

  getUsersSubscribedToPrivateChannel(channelId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/findByPrivateChannel/${channelId}`);
  }

  joinChannel(username: string, channel: string): Observable<any> {
    let user: User;
    this.getUserByUsername(username).subscribe(data => {
      user = data;
    });
    return this.http.put(`${this.usersUrl}/${username}/join/?channel=${channel}`, user,  httpOptions);
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

  joinPrivateChannel(user: User, privateChannel: PrivateChannel): Observable<User>{
    return this.http.put(`${this.usersUrl}/${user.id}/joinPrivateChannel?privateChannelId=${privateChannel.id}`, privateChannel, httpOptions);
  }
}
