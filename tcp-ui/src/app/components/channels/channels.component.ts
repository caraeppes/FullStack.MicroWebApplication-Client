import { Component, OnInit } from '@angular/core';
import { Channel} from "../../models/channel";
import { ChannelService} from "../../services/channel.service";
import {NotificationService} from "../../services/notification.service";
import {forEach} from '@angular/router/src/utils/collection';
import {SessionStorageService} from "ngx-webstorage";
import { User } from '../../models/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  channels: Channel[];
  user: User;

  constructor(private channelService: ChannelService,
              private notificationService: NotificationService,
              private session: SessionStorageService,
              private router: Router) { }

  ngOnInit() {
    this.getChannels();
    this.user = this.session.retrieve("currentUser");
    this.channelService.addDefaultChannel()
        .subscribe(channel => {
          if (channel != null) {
            this.channels.push(channel);
          }
        });
  }

  getChannels(): void {
    this.channelService.getChannels()
      .subscribe(channels => this.channels = channels);
  }

  add(channelName: string): void {
    this.channelService.addChannel({channelName} as Channel)
      .subscribe(channel => {
        this.channels.push(channel);
        this.notificationService.add("Created channel: " + channel.channelName);
      });
  }

  delete(id: number): void {
    this.channels = this.channels.filter(c => c.id !== id);
    this.channelService.getChannel(id).subscribe(channel => {
      this.notificationService.add('Deleted channel: ' + channel.channelName);
    })
    this.channelService.deleteChannel(id).subscribe();
  }

  updateChannel(channel: Channel): void {
    this.session.store("currentChannel", channel);
  }
}
