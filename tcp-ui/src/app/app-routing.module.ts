import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChannelsComponent} from "./components/channels/channels.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ChannelDetailComponent} from "./components/channel-detail/channel-detail.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'detail/:id', component: ChannelDetailComponent},
  {path: 'channels', component: ChannelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
