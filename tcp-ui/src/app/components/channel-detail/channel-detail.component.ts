import {Component, OnInit} from '@angular/core';
import {Channel} from "../../models/channel";
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ChannelService} from "../../services/channel.service";
import {UserService} from "../../services/user.service";
import {AppComponent} from "../../app.component";
import {NotificationService} from "../../services/notification.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ["../../app.component.css"]
})

export class ChannelDetailComponent implements OnInit {
  channel: Channel;
  channelId: number;
  currentUser: User;
  users: User[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private channelService: ChannelService,
              private userService: UserService,
              private appComponent: AppComponent,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getChannel();
    this.currentUser = this.appComponent.currentUser;
    this.getUsers();
  }

  getChannel(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.channelService.getChannel(id)
      .subscribe(channel => this.channel = channel);
    this.channelId = id;
  }

  goBack(): void {
    this.location.back();
  }

  addUser(user: User) {
    this.userService.joinChannel(user.username, this.channel.channelName).subscribe(user => {
        this.channel.users.push(user);
      }
    );
    this.notificationService.add(user.username + " has joined the channel!");
  }

  getUsers() {
    this.userService.getUsersSubscribedToChannel(this.channelId).subscribe(users => {
      this.users = users;
    });
  }


}
