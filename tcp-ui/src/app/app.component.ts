import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "./services/user.service";
import {User} from "./models/user";
import {ChannelService} from "./services/channel.service";
import {Channel} from "./models/channel";
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  currentUser: User;
  currentUserSubscription: Subscription;
  currentChannel: Channel;
  currentChannelSubscription: Subscription;

  constructor(private router: Router,
              private userService: UserService,
              private notificationService: NotificationService,
              private channelService: ChannelService) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.currentChannelSubscription = this.channelService.currentChannel.subscribe(channel => {
      this.currentChannel = channel;
    });
  }

  title = 'Tcp Chat App';

  logout(){
    this.userService.changeCurrentUser(null);
    this.currentUser = null;
    this.notificationService.clear();
    this.router.navigate(['/login']);
  }
}


