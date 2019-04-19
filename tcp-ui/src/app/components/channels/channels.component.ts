import { Component, OnInit } from '@angular/core';
import { Channel} from "../../models/channel";
import { ChannelService} from "../../services/channel.service";
import {NotificationService} from "../../services/notification.service";
import {forEach} from '@angular/router/src/utils/collection';
import {SessionStorageService} from "ngx-webstorage";
import {User} from "../../models/user";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ["../../app.component.css"]
})
export class ChannelsComponent implements OnInit {

  channels: Channel[];
  user: User;

  constructor(private channelService: ChannelService,
              private notificationService: NotificationService,
              private session: SessionStorageService) { }

  ngOnInit() {
    this.getChannels();
    this.channelService.addDefaultChannel()
        .subscribe(channel => {
          if (channel != null) {
            this.channels.push(channel);
          }
        });
    this.user = this.session.retrieve("currentUser");
  }

  getChannels(): void {
    this.channelService.getChannels()
      .subscribe(channels => this.channels = channels);
  }

  add(channelName: string): void {
    this.channelService.addChannel({channelName} as Channel)
      .subscribe(channel => {
        this.channels.push(channel);
      });
  }

  delete(id: number): void {
    this.channels = this.channels.filter(c => c.id !== id);
    this.channelService.deleteChannel(id).subscribe();
    this.notificationService.add('Deleted channel');
  }

  updateChannel(channel: Channel): void {
    this.channelService.updateCurrentChannel(channel);
  }
}
