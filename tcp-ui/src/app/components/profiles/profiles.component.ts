import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {AppComponent} from "../../app.component";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  query: String;

  constructor(private userService: UserService,
              private appComponent: AppComponent,
              private storage: SessionStorageService) {}


  ngOnInit() {
    this.currentUser = this.storage.retrieve("currentUser");
    this.storage.store("currentProfile", this.currentUser);
    this.loadAllUsers();
  }

  ngOnChanges(){
    this.loadAllUsers();
  }

  onSelect(user: User): void {
    this.storage.store("currentProfile", user);
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
