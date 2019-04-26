import {Component, DoCheck, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {Channel} from './models/channel';
import {NotificationService} from './services/notification.service';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  currentUser: User;
  currentChannel: Channel;
  loggedIn: boolean;

  constructor(private router: Router,
              private userService: UserService,
              private notificationService: NotificationService,
              private session: SessionStorageService) {
    this.currentUser = null;
    this.loggedIn = this.session.retrieve('currentUser') != null;
    this.currentChannel = null;
    this.session.store('currentChannel', this.currentChannel);
    this.loggedIn = this.session.retrieve('currentUser') != null;
  }

  title = 'ChatDragon';

  ngDoCheck() {
    this.loggedIn = this.session.retrieve('loggedIn');
  }

  logout() {
    this.currentUser = this.session.retrieve('currentUser');
    this.userService.logoutUser(this.currentUser.username).subscribe(() =>{
       this.session.store('currentUser', null);
     });
    this.session.store('loggedIn', false);
    this.notificationService.clear();
    this.router.navigate(['/login']);
  }
}
