import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { ChannelDetailComponent } from './components/channel-detail/channel-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ChatComponent} from './components/chat/chat.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import {PrivateChannelsComponent} from './components/private-channels/private-channels.component';
import {NgxWebstorageModule} from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    ChannelDetailComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent,
    NotificationComponent,
    ProfilesComponent,
    ProfileDetailComponent,
    PrivateChannelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
