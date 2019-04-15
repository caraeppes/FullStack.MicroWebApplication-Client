import { Component, OnInit } from '@angular/core';
import { NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ["../../app.component.css"]
})
export class NotificationComponent implements OnInit {

  constructor(public notificationService: NotificationService) { }

  ngOnInit() {
  }

}
