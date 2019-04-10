import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HomeRoutingModule} from "./home-routing.module";
import {MaterialModule} from "../../material.module";
import {UsersModule} from "../users/users.module";
import {HomeComponent} from "./home.component";
import {MessageModule} from "../message/message.module";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MaterialModule,
    UsersModule,
    MessageModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
