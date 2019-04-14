import {Component, OnInit} from '@angular/core';
import {FormBuilder,  FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ["../../app.component.css"]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      username: ''
    });
  }


  onSubmit() {
    this.userService.registerUser(this.registerForm.value).subscribe( user => {
      this.userService.changeCurrentUser(user.username);
    });
    this.router.navigate(['/home']);

  }





}
