import { Injectable } from '@angular/core';
import { Channel} from "../channel";
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private messageService: MessageService,
              private http : HttpClient) { }

  getChannels(): Observable<Channel[]> {
    this.messageService.add('ChannelService: fetched channels');
    return this.http.get<Channel[]>('/server/channels');
  }

  getChannel(id : number): Observable<Channel>{
    this.messageService.add(`ChannelService: fetched channel id=${id}`);
    return this.http.get<Channel>(`/server/channels/${id}`);
  }

  addChannel(channel : Channel): Observable<Channel> {
    return this.http.post<Channel>(`/server/channels`, channel, httpOptions).pipe(
      tap((newChannel: Channel) => this.messageService.add(`added channel with id = ${newChannel.id}`))
    );
  }

  deleteChannel(channel: Channel | number): Observable<Channel> {
    const id = typeof channel === 'number' ? channel : channel.id;
    return this.http.delete<Channel>(`/server/channels/${id}`, httpOptions).pipe(
      tap(_ => this.messageService.add(`deleted channel id=${id}`))
    );
  }

  updateChannel(channel: Channel): Observable<any> {
    return this.http.put(`/server/channels`, channel, httpOptions).pipe(
      tap(_ => this.messageService.add(`updated channel id=${channel.id}`))
    );
  }
}
