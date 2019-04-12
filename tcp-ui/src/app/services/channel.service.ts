import { Injectable } from '@angular/core';
import { Channel} from "../channel";
import { CHANNELS} from "../mock-channels";
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private messageService: MessageService,
              private http : HttpClient) { }

  getChannels(): Observable<Channel[]> {
    this.messageService.add('ChannelService: fetched channels');
    return this.http.get('/server/channels');
  }

  getChannel(id : number): Observable<Channel>{
    this.messageService.add(`ChannelService: fetched channel id=${id}`);
    return of(CHANNELS.find(channel => channel.id === id));
  }
}
