import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "angularx-social-login";
import {StompService} from 'ng2-stomp-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private receiver: string;
  private username: string;

  constructor( private router: Router, private userService: UserService
    , private stompService: StompService, private authService: AuthService) {
    stompService.configure({
      host: '/server',
      queue: {'init': false}
    });
  }

  ngOnInit() {
    this.username = sessionStorage.getItem( 'user' );
    if ( this.username == null || this.username === '' ) {
      this.router.navigate( ['/'] );
    } else {
      this.userService.login({'id': null, 'username': this.username});
    }
  }

  @HostListener('window:unload', ['$event'])
  onUnload() {
    this.logout();
  }

  onReceiverChange(event) {
    this.receiver = event;
  }

  logout() {
    this.userService.logout({'id': null, 'username': this.username})
      .subscribe(
        res => {
          this.logoutSocial();
        },
        error => {
          console.log(error._body);
        });
  }

  logoutSocial() {
    this.authService.signOut().then(() => {
        this.clearSession();
      },
      error => {
        this.clearSession();
      });
  }

  clearSession() {
    sessionStorage.removeItem( 'user' );
    this.stompService.disconnect();
    this.username = null;
    this.router.navigate( ['/'] );
  }
}
