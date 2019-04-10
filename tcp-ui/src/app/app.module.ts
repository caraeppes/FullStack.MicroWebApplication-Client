import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule} from "@angular/forms";
import { ViewUserComponent } from './components/view-user/view-user.component';
import { CallbackComponent } from './components/callback/callback.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ViewUserComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
