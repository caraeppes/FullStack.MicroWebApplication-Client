import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable, of, Subject} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {MessageService} from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = '/server/users';
  currentUser: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getAllUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`).pipe(
      tap(_ => this.log(`fetches user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/findusername/${username}`).pipe(
      tap(_ => this.log(`fetches user =${username}`)),
      catchError(this.handleError<User>(`getUserByUsername username=${username}`))
    );
  }


  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    return this.http.delete<User>(`${this.usersUrl}/${id}`, httpOptions).pipe(
      tap(_ => this.log(`deleted channel id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`ChannelService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  changeCurrentUser(username: string) {
    this.currentUser.next(username);
  }

}
