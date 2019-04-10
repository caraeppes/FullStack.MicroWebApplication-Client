import { Injectable } from '@angular/core';
import {Message} from "../models/message";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: Array<Message> = [];
  private msgs = new Subject<Array<Message>>();

  constructor() {}

  pushMessage(message: Message) {
    this.messages.push(message);
    this.msgs.next(this.messages);
  }

  filterMessages(channel: string): Array<Message> {
    return this.messages.filter(message => channel === message.channel)
      .sort((m1, m2) => {
        if (m1.timestamp > m2.timestamp) {
          return 1;
        }

        return -1;
      });
  }

  getMessages(): Observable<any> {
    return this.msgs.asObservable();
  }

}
