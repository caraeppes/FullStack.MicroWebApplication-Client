import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import {Message} from "../../models/message";
import {AppComponent} from "../../app.component";
import {User} from "../../models/user";
import {Channel} from "../../models/channel";
import {MessageService} from "../../services/message.service";
import {Observable} from "rxjs";
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
  channel: Channel;

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
      'channel': this.channel.channelName,
      'sender': this.currentUser.username,
      'timestamp': new Date(),
      'messageContent': this.message.trim()
    });
    this.ws.send("/app/messages", {}, data as Message);
    this.message = '';
  }

  getMessageChannel(message: HttpResponse): boolean {
    return ((JSON.parse(message.body) as Message).channel) == this.channel.channelName;
  }

  showMessage(message: HttpResponse) {
    if (this.getMessageChannel(message)) {

      this.messages.push(JSON.parse(message.body).sender + ": " +
        (JSON.parse(message.body) as Message).messageContent
      );
    }
  }

  ngOnInit(): void {
    this.currentUser = this.appComponent.currentUser;
    this.connect();
    this.channel = this.appComponent.currentChannel as Channel;
    this.getMessages();
  }

  getMessages() {
    this.messageService.getMessagesByChannel(this.channel.channelName).subscribe(messages => {
      messages.forEach(message => {
        this.messages.push(message.sender + ": " + message.messageContent);
      });
    });
  }
}
