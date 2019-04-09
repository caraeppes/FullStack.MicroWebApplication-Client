import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  public userInfo;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params.id);
  }

  getUserInfo(id:number) {
    this.userService.getUser(id).subscribe(
      data => {
        this.userInfo = data;
      },
      err => console.error(err),
      () => console.log('user loaded')
    );
  }

}
