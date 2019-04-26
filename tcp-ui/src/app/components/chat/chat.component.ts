import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Stomp from 'stompjs';
import {Message} from "../../models/message";
import {AppComponent} from "../../app.component";
import {User} from "../../models/user";
import {Channel} from "../../models/channel";
import {MessageService} from "../../services/message.service";
import {HttpResponse} from "@angular/common/http";
import {NotificationService} from "../../services/notification.service";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];
  ws: any;
  message: string;
  editedMessage: string;
  currentUser: User;
  channel: Channel;
  editingMessage: boolean;
  messageToEdit: Message;
  @ViewChild('messageBox') private messageBox: ElementRef;

  constructor(private appComponent: AppComponent,
              private messageService: MessageService,
              private notificationService: NotificationService,
              private session: SessionStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.session.retrieve("currentUser");
    this.connect();
    this.channel = this.session.retrieve("currentChannel");
    this.getMessages();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
      this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
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
    this.ws.send("/app/messages", {}, data);
    this.message = '';
  }

  messageIsInChannel(messageResponse: HttpResponse<Message>): boolean {
    let message = JSON.parse(messageResponse.body.toString());
    console.log(this.channel.channelName);
    return message.channel  == this.channel.channelName;
  }

  showMessage(message: HttpResponse<Message>) {
    if (this.messageIsInChannel(message)) {
      this.messages.push(JSON.parse(message.body.toString()));
    }
  }

  getMessages() {
    this.messageService.getMessagesByChannel(this.channel.channelName).subscribe(messages => {
      messages.forEach(message => {
        this.messages.push(message);
      });
      this.messages.reverse();
    });
  }

  editMessage(message: Message, newMessage: string){
      this.messageService.editMessage(message, newMessage + "  (Edited)").subscribe(() => {
        this.messages = [];
        this.getMessages();
        this.messageToEdit = null;
        this.editingMessage = false;
      });
    }

  deleteMessage(id: number) {
    this.messages = this.messages.filter(m => m.id != id);
    this.messageService.deleteMessage(id).subscribe(() => {
        this.notificationService.add("Deleted message");
      }
    );
  }

  editOnClick(message: Message){
    this.messageToEdit = message
    this.editedMessage = message.messageContent;
    this.editingMessage = true;
  }
}
