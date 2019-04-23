import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable, Subject, Subscription} from "rxjs";
import {SessionStorageService} from "ngx-webstorage";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = '/server/users';
  currentUser: Subject<any> = new Subject<any>();
  userSubscription: Subscription;
  user: User;

  constructor(private http: HttpClient,
              private session: SessionStorageService) {
    this.userSubscription = this.currentUser.subscribe(user => {
      this.user = user;
    });
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

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    return this.http.delete<User>(`${this.usersUrl}/${id}`, httpOptions);
  }

  changeCurrentUser(username: string) {
    this.getUserByUsername(username).subscribe(user => {
      this.currentUser.next(user);
      this.session.store("currentUser", user);
      this.session.store("loggedIn", user != null);
    });
  }


}
