import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {SessionStorageService} from "ngx-webstorage";
import {ChannelService} from '../../services/channel.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  allUsers: User[] =[];
  validUser: boolean;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              public session: SessionStorageService,
              private channelService: ChannelService) { }
  
  ngOnInit() {
    this.validUser = false;
    this.submitted = false;
    this.getAllUsers();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  getAllUsers(){
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  onSubmit(username: string) {
    if(this.allUsers.filter(user => user.username == username).length == 1) {
      this.userService.loginUser(username).subscribe();
      this.session.store("currentUser", this.allUsers.filter(user => user.username == username)[0]);
      this.session.store("loggedIn", this.session.retrieve("currentUser") != null);
      this.validUser = true;
      this.router.navigate(['/home']);
      this.channelService.addDefaultChannel().subscribe(channel => {
        this.userService.joinChannel(username, 'Main Channel').subscribe();
      });
    }
    this.submitted = true;
  }
}
