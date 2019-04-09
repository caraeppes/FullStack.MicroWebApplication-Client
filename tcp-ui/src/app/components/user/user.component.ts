import { Component, OnInit } from '@angular/core';
import { UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      data => {this.users = data},
      err => console.error(err),
      () => console.log('users loaded')
    );
  }

}
