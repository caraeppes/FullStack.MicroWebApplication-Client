import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./components/user/user.component";
import { ViewUserComponent} from "./components/view-user/view-user.component";
import {HomeComponent} from "./components/home/home.component";
import {CallbackComponent} from "./components/callback/callback.component";
import { AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users/view/:id',
    component: ViewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
