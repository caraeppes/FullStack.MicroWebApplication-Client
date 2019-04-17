import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import {Message} from "../../models/message";
import {AppComponent} from "../../app.component";
import {User} from "../../models/user";
import {Channel} from "../../models/channel";
import {MessageService} from "../../services/message.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ["../../app.component.css"]
})
export class ChatComponent implements OnInit {

  messages: string[] = [];
  ws: any;
  message: string;
  currentUser: User;
  channel: unknown;

  constructor(private appComponent: AppComponent,
              private messageService: MessageService) {
  }

  connect() {
    let socket = new WebSocket("ws://localhost:8081/chat");
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect({}, function () {
      that.ws.subscribe("/topic/reply", function (message) {
        that.showMessage(message
        );
      });
    });
  }

  sendMessage() {
    let data = JSON.stringify({
      'channel': (this.channel as Channel).channelName,
      'sender': this.currentUser.username,
      'timestamp': new Date(),
      'messageContent': this.message.trim()
    });
    this.ws.send("/app/messages", {}, data);
    this.message = '';
  }

  getMessageChannel(message: HttpResponse<string>): boolean {
    return ((JSON.parse(message.body) as Message).channel) == (this.channel as Channel).channelName;
  }

  showMessage(message: HttpResponse<string>) {
    if (this.getMessageChannel(message)) {

      this.messages.push(JSON.parse(message.body).sender + ": " +
        (JSON.parse(message.body) as Message).messageContent
      );
    }
  }

  ngOnInit(): void {
    this.currentUser = this.appComponent.currentUser;
    this.connect();
    this.channel = this.appComponent.currentChannel;
    this.getMessages();
  }

  getMessages() {
    this.messageService.getMessagesByChannel((this.channel as Channel).channelName).subscribe(messages => {
      messages.forEach(message => {
        this.messages.push(message.sender + ": " + message.messageContent);
      });
      this.messages.reverse();
    });
  }
}
