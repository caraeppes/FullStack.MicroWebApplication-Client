import {Component, OnInit} from '@angular/core';
import {Channel} from "../../models/channel";
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ChannelService} from "../../services/channel.service";
import {UserService} from "../../services/user.service";
import {AppComponent} from "../../app.component";
import {NotificationService} from "../../services/notification.service";
import {User} from "../../models/user";
import {Message} from "../../models/message";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ["../../app.component.css"]
})

//testing

export class ChannelDetailComponent implements OnInit {
  channel: Channel;
  channelId: number;
  currentUser: User;
  users: User[] = [];
  messages: Message[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private channelService: ChannelService,
              private userService: UserService,
              private appComponent: AppComponent,
              private notificationService: NotificationService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.getChannel();
    this.currentUser = this.appComponent.currentUser;
    this.getUsers();
    this.getMessages();
    this.messages.reverse();
  }

  getChannel(): void {
    this.channel = new Channel();
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.channelService.getChannel(id)
      .subscribe(channel => this.channel = channel);
    this.channelId = id;
    this.channel.users = [];
  }

  goBack(): void {
    this.location.back();
  }

  addUser(user: User) {
    this.userService.joinChannel(user.username, this.channel.channelName).subscribe(user => {
        this.channel.users.push(user.username);
      }
    );
    this.notificationService.add(user.username + " has joined the channel!");
  }

  removeUser(user: User){
    this.userService.leaveChannel(user.username, this.channel.channelName).subscribe( u => {
      console.log(u.username);
    });
  }

  getUsers() {
    this.userService.getUsersSubscribedToChannel(this.channelId).subscribe(users => {
      this.users = users;
      this.channel.users = [];
      for(let user of users){
        this.channel.users.push(user.username);
      }
    });
  }

  getMessages(){
    this.messageService.getMessagesByChannel(this.channel.channelName).subscribe(messages => {
      this.messages = messages;
    });
  }

}
