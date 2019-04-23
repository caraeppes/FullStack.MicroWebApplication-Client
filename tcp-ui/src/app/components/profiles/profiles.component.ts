import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {AppComponent} from "../../app.component";
import {SessionStorageService} from "ngx-webstorage";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnInit {
  currentUser: User;
  currentProfile: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  query: String;

  constructor(private userService: UserService,
              private appComponent: AppComponent,
              private session: SessionStorageService) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.currentUser = this.appComponent.currentUser;
    this.currentProfile = this.appComponent.currentUser;
    this.loadAllUsers();
  }

  ngOnChanges(){
    this.loadAllUsers();
  }

  onSelect(user: User): void {
    this.currentProfile = user;
  }

  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.search();
    });
  }

  search() {
    if (this.query) {
      this.query = this.query.toLowerCase();
      this.users = [];
      this.userService.getUsers().subscribe(users => {
        users.filter(user =>
          (user.username.toLowerCase() == this.query || user.firstName.toLowerCase() == this.query ||
            user.lastName.toLowerCase() == this.query || user.firstName.toLowerCase() + " " + user.lastName.toLowerCase() == this.query)
        ).map(user => {
          this.users.push(user);
        });
      });
    }
  }



}
