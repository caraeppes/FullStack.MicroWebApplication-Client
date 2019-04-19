import { Component, OnInit } from '@angular/core';
import { Channel} from "../../models/channel";
import { ChannelService} from "../../services/channel.service";
import { NotificationService } from "../../services/notification.service";
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ["../../app.component.css"]
})
export class ChannelsComponent implements OnInit {

  channels: Channel[];
  currentUser: User;

  constructor(private channelService: ChannelService,
              private notificationService: NotificationService,
              private userService: UserService,
              private appComponent: AppComponent) { }

  ngOnInit() {
    this.currentUser = this.appComponent.currentUser;
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
    this.notificationService.add('Deleted channel');
  }

  updateChannel(channel: Channel): void {
    this.channelService.updateCurrentChannel(channel);
  }
}
