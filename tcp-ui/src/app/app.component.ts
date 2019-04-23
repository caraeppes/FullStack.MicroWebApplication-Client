import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {UserService} from "./services/user.service";
import {User} from "./models/user";
import {ChannelService} from "./services/channel.service";
import {Channel} from "./models/channel";
import {NotificationService} from './services/notification.service';
import {SessionStorageService} from 'ngx-webstorage';
import {HomeComponent} from "./components/home/home.component";

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
  loggedIn: boolean;
  users: User[] = [];

  constructor(private router: Router,
              private userService: UserService,
              private notificationService: NotificationService,
              private channelService: ChannelService,
              public session: SessionStorageService) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.session.store("currentUser", user);
      this.loggedIn = this.session.retrieve("currentUser") != null;
    });
    this.currentChannelSubscription = this.channelService.currentChannel.subscribe(channel => {
      this.currentChannel = channel;
      this.session.store("currentChannel", channel);
    });
    this.loggedIn = this.session.retrieve("currentUser") != null;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  title = 'Dragon Chat';

  logout() {
    this.userService.changeCurrentUser(null);
    this.session.store("currentUser", null);
    this.notificationService.clear();
    this.router.navigate(['/login']);
  }
}
