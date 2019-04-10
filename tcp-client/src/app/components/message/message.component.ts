import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../models/message";
import {StompService} from 'ng2-stomp-service';
import {MessageService} from "../../services/message.service";
import {ChannelService} from "../../services/channel.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private filteredMessages: Array<Message> = [];
  private newMessage: string;
  private channel: string;

  @Input()
  private username: string;

  constructor(private stompService: StompService, private messageService: MessageService
    , private channelService: ChannelService) { }

  ngOnInit() {
    this.channelService.getChannel().subscribe(channel => {
      this.channel = channel;
      this.filterMessages();
    });

    this.messageService.getMessages().subscribe(messages => {
      this.filterMessages();
    });
  }

  sendMessage() {
    if (this.newMessage) {
      this.stompService.send('/app/messages', {'channel': this.channel
        , 'sender': this.username, 'content': this.newMessage});
      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  filterMessages() {
    this.filteredMessages = this.messageService.filterMessages(this.channel);
    this.scrollToBottom();
  }

  scrollToBottom() {
    const msgContainer = document.getElementById('msg-container');
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }
}
