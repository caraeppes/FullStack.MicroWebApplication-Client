import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";
import {AppComponent} from "../../app.component";
import {SessionStorageService} from "ngx-webstorage";
import {ProfileDetailComponent} from "../profile-detail/profile-detail.component";

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

  onSelect(user: User): void {
    this.currentProfile = user;
  }

  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  }
