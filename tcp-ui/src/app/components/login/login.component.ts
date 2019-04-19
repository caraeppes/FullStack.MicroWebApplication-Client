import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["../../app.component.css"]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  allUsers: User[] =[];
  validUser: boolean;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              public session: SessionStorageService) { }

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
      console.log(this.allUsers);
    });

  }

  onSubmit(username: string) {
    if(this.allUsers.filter(user => user.username == username).length == 1) {
      this.userService.changeCurrentUser(username);
      this.session.store("currentUser", this.allUsers.filter(user => user.username == username)[0]);
      this.session.store("loggedIn", this.session.retrieve("currentUser") != null);
      this.validUser = true;
      this.router.navigate(['/home']);
    }
    this.submitted = true;
  }
}
