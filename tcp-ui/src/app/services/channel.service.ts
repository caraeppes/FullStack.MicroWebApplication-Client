import {Injectable} from '@angular/core';
import {Channel} from "../models/channel";
import {Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channelsUrl = '/server/channels';
  currentChannel: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.channelsUrl);
  }

  getChannel(id: number): Observable<Channel> {
    const url = `${this.channelsUrl}/${id}`;
    return this.http.get<Channel>(url);
  }

  getChannelByName(name: string): Observable<Channel> {
    return this.http.get<Channel>(`${this.channelsUrl}/getByName/${name}`);
  }

  addChannel(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(`/server/channels`, channel, httpOptions);
  }

  deleteChannel(channel: Channel | number): Observable<Channel> {
    const id = typeof channel === 'number' ? channel : channel.id;
    return this.http.delete<Channel>(`/server/channels/${id}`, httpOptions);
  }


  updateChannel(channel: Channel): Observable<any> {
    return this.http.put(this.channelsUrl, channel, httpOptions);
  }

  updateCurrentChannel(channel: string) {
    this.getChannelByName(channel).subscribe(channel => {
      this.currentChannel.next(channel);
    });
  }

}
