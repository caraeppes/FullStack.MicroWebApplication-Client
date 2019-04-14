import { Component, OnInit, Input } from '@angular/core';
import { Channel} from "../../models/channel";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChannelService} from "../../services/channel.service";
import {UserService} from "../../services/user.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ["../../app.component.css"]
})

export class ChannelDetailComponent implements OnInit {
  channel: Channel;
  currentUser: string;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private channelService: ChannelService,
              private userService: UserService,
              private appComponent: AppComponent){ }

  ngOnInit() {
    this.getChannel();
    this.currentUser = this.appComponent.currentUser;
  }

  getChannel(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.channelService.getChannel(id)
      .subscribe(channel => this.channel = channel);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.channelService.updateChannel(this.channel)
      .subscribe(() => this.goBack());
  }

  addUser(username: string){
    this.userService.joinChannel(username, this.channel.channelName).subscribe(user => {
      this.channel.users.push(username);
      }
    );
  }


}
