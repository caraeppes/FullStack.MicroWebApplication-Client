import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChannelsComponent} from "./components/channels/channels.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ChannelDetailComponent} from "./components/channel-detail/channel-detail.component";

const routes: Routes = [
  {path: 'channels', component: ChannelsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: ChannelDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
