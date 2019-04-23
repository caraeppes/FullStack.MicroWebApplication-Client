import { Component, OnInit } from '@angular/core';
import {PrivateChannel} from '../../models/private-channel';
import {PrivateChannelService} from '../../services/private-channel.service';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-private-channels',
  templateUrl: './private-channels.component.html',
  styleUrls: ['./private-channels.component.css']
})
export class PrivateChannelsComponent implements OnInit {

  privateChannels: PrivateChannel[] = [];
  currentUser: User;

  constructor(private privateChannelService: PrivateChannelService,
              private notificationService: NotificationService,
              private userService: UserService,
              private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.getChannels();
    this.currentUser = this.sessionStorageService.retrieve('currentUser');
  }

  getChannels(): void {
    this.privateChannelService.getChannelsByUser()
      .subscribe(privateChannelsOfUser => {
        privateChannelsOfUser.forEach(privateChannel => {
          this.setUsersString(privateChannel);
          this.privateChannels.push(privateChannel);
        });
      });
  }

  setUsersString(privateChannel: PrivateChannel): void {
    privateChannel.users = '';
    this.userService.getUsersSubscribedToPrivateChannel(privateChannel.id)
      .subscribe(users => {
        users.forEach(user => {
          if (user.username !== this.currentUser.username) {
            privateChannel.users += user.firstName + ', ';
          }
        });
        privateChannel.users = privateChannel.users.substring(0, privateChannel.users.length - 2);
      });
  }

  add(channelName: string): void {
    this.privateChannelService.addChannel({channelName} as PrivateChannel)
      .subscribe(privateChannel => {
        this.privateChannels.push(privateChannel);
      });
  }

  delete(id: number): void {
    this.privateChannels = this.privateChannels.filter(c => c.id !== id);
    this.privateChannelService.deleteChannel(id).subscribe();
    this.notificationService.add('Deleted privateChannel');
  }

  updateChannel(privateChannel: PrivateChannel): void {
    this.privateChannelService.updateCurrentChannel(privateChannel);
  }
}
