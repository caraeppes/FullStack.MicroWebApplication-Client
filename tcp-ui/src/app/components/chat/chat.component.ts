import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import {Message} from "../../models/message";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {AppComponent} from "../../app.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ["../../app.component.css"]
})
export class ChatComponent implements OnInit {

  messages: string[] = [];
  ws: any;
  message: string;
  currentUser: string;
  chatForm: FormGroup;

  constructor(private appComponent: AppComponent,
              private formBuilder: FormBuilder) {
  }

  connect() {
    let socket = new WebSocket("ws://localhost:8081/chat");
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect({}, function () {
      that.ws.subscribe("/topic/reply", function (message) {
        that.showMessage((JSON.parse(message.body) as Message).sender + ": " +
          (JSON.parse(message.body) as Message).messageContent
        );
      });
    });
  }

  sendMessage() {
    let data = JSON.stringify({
      'channel': 'public',
      'sender': this.currentUser,
      'messageContent': this.message
    });
    this.ws.send("/app/message", {}, data as Message);
    this.message = '';
  }

  showMessage(message: string) {
    this.messages.push(message)
  }

  ngOnInit(): void {
    this.currentUser = this.appComponent.currentUser;
    this.connect();
  }

  private handleKeyDown(event: any) {
    if (event.key == 13) {
      this.sendMessage();
    }
  }
}
