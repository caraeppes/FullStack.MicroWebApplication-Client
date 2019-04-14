import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable, Subject} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = '/server/users';
  currentUser: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUsersSubscribedToChannel(channelId: number){
    return this.http.get<User[]>(`${this.usersUrl}/findByChannel/${channelId}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  joinChannel(username: string, channel: string): Observable<any> {
    let user: User;
    this.getUserByUsername(username).subscribe(data => {
      user = data;
    })
    return this.http.put(`${this.usersUrl}/${username}/join/?channel=${channel}`, user, httpOptions);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/findusername/${username}`);
  }


  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    return this.http.delete<User>(`${this.usersUrl}/${id}`, httpOptions);
  }

  changeCurrentUser(username: string) {
    this.currentUser.next(username);
  }

}
