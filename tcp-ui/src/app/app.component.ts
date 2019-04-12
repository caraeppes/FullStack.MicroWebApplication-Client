import {Component} from '@angular/core';
import {User} from "./models/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TCP Chat App';
}
