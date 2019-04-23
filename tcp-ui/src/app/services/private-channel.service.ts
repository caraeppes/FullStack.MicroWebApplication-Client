import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PrivateChannel} from '../models/private-channel';
import {SessionStorageService} from 'ngx-webstorage';
import {User} from '../models/user';
import {Channel} from '../models/channel';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PrivateChannelService {

  protected channelsUrl = '/server/privatechannels';
  currentChannel: Subject<Channel> = new Subject<Channel>();

  constructor(private http: HttpClient, private session: SessionStorageService) {
  }

  getChannelsByUser(): Observable<PrivateChannel[]> {
    return this.http.get<PrivateChannel[]>(this.channelsUrl + '/getByUser/' + this.session.retrieve('currentUser').username);
  }

  getChannelByName(name: string): Observable<PrivateChannel> {
    return this.http.get<PrivateChannel>(`${this.channelsUrl}/getByName/${name}`);
  }

  addChannel(privateChannel: PrivateChannel): Observable<PrivateChannel> {
    return this.http.post<PrivateChannel>(`/server/privatechannels`, privateChannel, httpOptions);
  }

  deleteChannel(id: number): Observable<PrivateChannel> {
    return this.http.delete<PrivateChannel>(`/server/privatechannels/${id}`, httpOptions);
  }

  updateCurrentChannel(privateChannel: PrivateChannel) {
    this.getChannelByName(privateChannel.channelName).subscribe(channel => {
      this.currentChannel.next(channel);
    });
  }
}
