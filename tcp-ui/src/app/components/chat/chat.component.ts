import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import {Message} from "../../models/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages: string[] = [];
  showConversation: boolean = false;
  ws: any;
  name: string;
  disabled: boolean;

  constructor(){}

  connect() {
    //connect to stomp where stomp endpoint is exposed
    let socket = new WebSocket("ws://localhost:8081/chat");
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect({}, function() {
      that.ws.subscribe("/errors", function(message) {
        alert("Error " + message.body);
      });
      that.ws.subscribe("/topic/reply", function(message) {
        that.showGreeting((JSON.parse(message.body) as Message).messageContent);
      });
      that.disabled = true;
    }, function(error) {
      alert("STOMP error " + error);
    });
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.setConnected(false);
    console.log("Disconnected");
  }

  sendName() {
    let data = JSON.stringify({
      'name' : this.name
    })
    this.ws.send("/app/message", {}, JSON.stringify({'channel':'chatter', 'sender':'Cara',
    'messageContent':'hello!!!'} as Message));
  }

  showGreeting(message: string) {
    this.showConversation = true;
    this.messages.push(message)
  }

  setConnected(connected) {
    this.disabled = connected;
    this.showConversation = connected;
    this.messages = [];
  }
}
