import { Component, OnInit, Input } from '@angular/core';
import { Channel} from "../../channel";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChannelService} from "../../services/channel.service";

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.css']
})

export class ChannelDetailComponent implements OnInit {
  channel: Channel;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private channelService: ChannelService){ }

  ngOnInit() {
    this.getChannel();

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
}
