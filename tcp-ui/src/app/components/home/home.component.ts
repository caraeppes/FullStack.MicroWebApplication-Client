import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["../../app.component.css"]
})
export class HomeComponent implements OnInit {
  currentUser: string;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.currentUser = this.appComponent.currentUser;
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
