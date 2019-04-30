import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AppComponent} from "../../app.component";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  loggedIn: boolean;

  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private session: SessionStorageService,) {}

  ngOnInit() {
    this.currentUser = this.session.retrieve("currentUser");
    this.loggedIn = this.session.retrieve("loggedIn");
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
