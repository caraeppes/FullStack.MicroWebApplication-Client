import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  currentUser: string;
  currentUserSubscription: Subscription;

  constructor(private router: Router,
              private userService: UserService) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  title = 'TCP Chat App';
}
