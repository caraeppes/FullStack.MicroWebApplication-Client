import { Component, OnInit, Input } from '@angular/core';
import {User} from "../../models/user";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";
import {AppComponent} from "../../app.component";
import {SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  currentUser: User;
  currentProfile: User;

  constructor(private userService: UserService,
              private appComponent: AppComponent,
              private session: SessionStorageService
              ) { }

  ngOnInit() {
    this.currentProfile = this.session.retrieve("currentUser");
  }

  // @Input() currentProfile: User;
}
