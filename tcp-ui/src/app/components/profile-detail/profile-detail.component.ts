import { Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AppComponent} from "../../app.component";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})

export class ProfileDetailComponent implements OnInit {

  currentProfile: User;

  constructor(private userService: UserService,
              private appComponent: AppComponent,
              private session: SessionStorageService) {
  }

  ngOnInit() {
    this.currentProfile = this.session.retrieve("currentUser");
  }

  ngDoCheck(){
    this.currentProfile = this.session.retrieve("currentProfile");
  }

}
