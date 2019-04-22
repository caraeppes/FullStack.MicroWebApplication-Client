import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PrivateChannel} from '../models/private-channel';
import {AppComponent} from '../app.component';
import {User} from '../models/user';
import {}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PrivateChannelService {

  protected channelsUrl = '/server/privatechannels';

  constructor(private http: HttpClient) {
  }

  getChannelsByUser(): Observable<PrivateChannel[]> {
    return this.http.get<PrivateChannel[]>(this.channelsUrl + '/getByUser/' + this.currentUser.username);
  }

}
