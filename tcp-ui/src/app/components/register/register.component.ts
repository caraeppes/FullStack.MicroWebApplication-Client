import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {ChannelService} from '../../services/channel.service';
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ["../../app.component.css"]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  allUsers: User[] = [];
  validUser: boolean;
  submitted: boolean;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private channelService: ChannelService,
              private storage: SessionStorageService) {
  }

  ngOnInit() {
    this.validUser = false;
    this.submitted = false;
    this.getAllUsers();
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      username: ''
    });
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
      console.log(this.allUsers);
    });

  }

  onSubmit(username: string) {
    if (this.allUsers.filter(user => user.username == username).length == 0) {
      this.validUser = true;
      this.userService.registerUser(this.registerForm.value).subscribe(user => {
        this.storage.store("currentUser", user);
        this.storage.store("loggedin", true);
        this.channelService.addDefaultChannel().subscribe();
        this.userService.joinChannel(user.username, 'Main Channel').subscribe();
        this.userService.loginUser(username).subscribe(() => {
          this.router.navigate(['/home']);
        });
      });
    }
    this.submitted = true;
  }


}
