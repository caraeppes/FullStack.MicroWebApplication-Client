import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Observable, Subject, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";
import {AppComponent} from "../../app.component";
import {Session} from "inspector";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["../../app.component.css"]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  loggedIn: boolean;


  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private session: SessionStorageService) {

  }

  ngOnInit() {
    this.currentUser = this.session.retrieve("currentUser");
    this.loggedIn = this.session.retrieve("loggedIn");
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
