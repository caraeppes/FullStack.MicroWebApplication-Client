import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {UserService} from "./services/user.service";
import {User} from "./models/user";
import {ChannelService} from "./services/channel.service";
import {Channel} from "./models/channel";
import {NotificationService} from './services/notification.service';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;
  currentChannel: Channel;
  loggedIn: boolean;

  constructor(private router: Router,
              private userService: UserService,
              private notificationService: NotificationService,
              public session: SessionStorageService) {
    this.currentUser = null;
    this.loggedIn = this.session.retrieve("currentUser") != null;
    this.currentChannel = null;
    this.session.store("currentChannel", this.currentChannel);
    this.loggedIn = this.session.retrieve("currentUser") != null;
  }


  title = 'ChatDragon';

  logout() {
    this.currentUser = this.session.retrieve("currentUser");
     this.userService.logoutUser(this.currentUser.username).subscribe(()=>{
       this.session.store("currentUser", null);
     });


    this.notificationService.clear();
    this.router.navigate(['/login']);
  }
}
