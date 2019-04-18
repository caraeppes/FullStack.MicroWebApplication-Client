import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../models/message";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})};

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

  deleteMessage(id: number): Observable<Message> {
    return this.http.delete<Message>(`/server/messages/${id}`, httpOptions);
  }

}
