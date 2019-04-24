import {Injectable} from '@angular/core';
import {Channel} from "../models/channel";
import {Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionStorageService} from 'ngx-webstorage';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  protected channelsUrl = '/server/channels';
  currentChannel: Subject<Channel> = new Subject<Channel>();

  constructor(private http: HttpClient,
              private session: SessionStorageService) {
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.channelsUrl);
  }

  getPrivateChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(`/server/channels/private/` + this.session.retrieve('currentUser').username);
  }

  getChannel(id: number): Observable<Channel> {
    const url = `${this.channelsUrl}/${id}`;
    return this.http.get<Channel>(url);
  }

  addChannel(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(`/server/channels`, channel, httpOptions);
  }

  addDefaultChannel(): Observable<Channel> {
    return this.http.post<Channel>(`/server/channels/default`, httpOptions);
  }

  deleteChannel(id: number): Observable<Channel> {
    return this.http.delete<Channel>(`/server/channels/${id}`, httpOptions);
  }
}
