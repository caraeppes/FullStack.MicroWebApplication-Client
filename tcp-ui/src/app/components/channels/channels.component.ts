import { Component, OnInit } from '@angular/core';
import { Channel} from "../../models/channel";
import { ChannelService} from "../../services/channel.service";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ["../../app.component.css"]
})
export class ChannelsComponent implements OnInit {

  channels: Channel[];

  constructor(private channelService: ChannelService) { }

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

  delete(channel: Channel): void {
    this.channels = this.channels.filter(c => c !== channel);
    this.channelService.deleteChannel(channel).subscribe();
  }

}
