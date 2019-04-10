import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StompService } from 'ng2-stomp-service';
import {UserService} from "./services/user.service";
import {ChannelService} from "./services/channel.service";
import {MessageService} from "./services/message.service";
import {SocialLoginModule} from "angularx-social-login";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [UserService, ChannelService, StompService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
