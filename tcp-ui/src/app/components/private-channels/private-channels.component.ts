import { Component, OnInit } from '@angular/core';
import {PrivateChannel} from '../../models/private-channel';
import {PrivateChannelService} from '../../services/private-channel.service';

@Component({
  selector: 'app-private-channels',
  templateUrl: './private-channels.component.html',
  styleUrls: ["../../app.component.css"]
})
export class PrivateChannelsComponent implements OnInit {

  privateChannels: PrivateChannel[];

  constructor(private privateChannelService: PrivateChannelService) { }

  ngOnInit() {
    this.getChannels();
  }

  getChannels(): void {
    this.privateChannelService.getChannelsByUser()
      .subscribe(privateChannel => this.privateChannels = privateChannel);
  }

}
