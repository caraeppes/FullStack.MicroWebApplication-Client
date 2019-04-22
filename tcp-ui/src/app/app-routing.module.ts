import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChannelsComponent} from "./components/channels/channels.component";
import {ChannelDetailComponent} from "./components/channel-detail/channel-detail.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ChatComponent} from "./components/chat/chat.component";
import {ProfilesComponent} from "./components/profiles/profiles.component";
import {ProfileDetailComponent} from "./components/profile-detail/profile-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'detail/:id', component: ChannelDetailComponent},
  {path: 'channels', component: ChannelsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'profiles', component: ProfilesComponent},
  {path: 'profiledetail/:username', component: ProfileDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
