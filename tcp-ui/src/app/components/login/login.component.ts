import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }


  onSubmit() {
    this.userService.changeCurrentUser(this.loginForm.controls.username.value);
    this.router.navigate(['/home']);
  }
}
