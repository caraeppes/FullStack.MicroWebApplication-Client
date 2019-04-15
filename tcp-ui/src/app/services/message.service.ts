import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesUrl = '/server/messages';

  constructor(private http: HttpClient) { }

  getMesages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl);
  }

  getMessagesByChannel(channel: string): Observable<Message[]>{
    return this.http.get<Message[]>(`${this.messagesUrl}/findAll/${channel}`);
  }

}
