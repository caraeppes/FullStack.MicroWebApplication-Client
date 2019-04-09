import { Component, OnInit } from '@angular/core';
import { UserService} from "../../services/user.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userForm: FormGroup;
  validMessage: string = "";


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required)
    });
  }

  submitUser() {
    if(this.userForm.valid) {
      this.validMessage = "You have successfully registered!";
      this.userService.createUser(this.userForm.value).subscribe(
        data => {
          this.userForm.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    } else {
      this.validMessage = "Please fill out all fields and try again!";
    }
  }

}
