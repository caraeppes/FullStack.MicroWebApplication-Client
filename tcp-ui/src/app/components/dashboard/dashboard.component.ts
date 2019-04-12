import { Component, OnInit } from '@angular/core';
import { Channel} from "../../channel";
import { ChannelService} from "../../services/channel.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  channels: Channel[] = [];

  constructor(private channelService: ChannelService) { }

  ngOnInit() {
    this.getChannels();
  }

  getChannels(): void {
    this.channelService.getChannels()
      .subscribe(channels => this.channels = channels.slice(1, 5));
  }
}
