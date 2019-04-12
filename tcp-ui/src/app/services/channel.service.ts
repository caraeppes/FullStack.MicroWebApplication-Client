import {Injectable} from '@angular/core';
import {Channel} from "../channel";
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channelsUrl = '/server/channels';

  constructor(private messageService: MessageService,
              private http: HttpClient) {
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.channelsUrl)
      .pipe(
        tap(_ => this.log('fetched channels')),
        catchError(this.handleError<Channel[]>('getChannels', []))
      );
  }

  getChannel(id: number): Observable<Channel> {
    const url = `${this.channelsUrl}/${id}`;
    return this.http.get<Channel>(url).pipe(
      tap(_ => this.log(`fetched channel id=${id}`)),
      catchError(this.handleError<Channel>(`getChannel id=${id}`))
    );
  }

  addChannel(channel: Channel): Observable<Channel> {
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
    return this.http.put(this.channelsUrl, channel, httpOptions).pipe(
      tap(_ => this.log(`updated channel id=${channel.id}`)),
      catchError(this.handleError<any>('updateChannel'))
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
}
