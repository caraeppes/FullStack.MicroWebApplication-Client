import { Component, OnInit } from '@angular/core';
import { Channel} from "../../models/channel";
import { ChannelService} from "../../services/channel.service";
import {forEach} from "@angular/router/src/utils/collection";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ["../../app.component.css"]
})
export class ChannelsComponent implements OnInit {

  channels: Channel[];

  constructor(private channelService: ChannelService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.getChannels();

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
      this.notificationService.add("Deleted channel");
  }

  updateChannel(channel: string): void {
    this.channelService.updateCurrentChannel(channel);
  }
}
