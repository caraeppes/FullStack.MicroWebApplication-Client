import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentSubscription: Subscription;
  users: User[] = [];

  constructor(
    private userService: UserService) {
  }

  ngOnInit() {
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
