import { Component, OnInit } from '@angular/core';
import { Channel} from "../../channel";
import { ChannelService} from "../../services/channel.service";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  channels: Channel[];

  getChannels(): void {
    this.channelService.getChannels()
      .subscribe(channels => this.channels = channels);
  }

  constructor(private channelService: ChannelService) { }

  ngOnInit() {
    this.getChannels();

  }


}
