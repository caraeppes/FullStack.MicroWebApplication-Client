import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import {LoginRoutingModule} from "./login-routing.module";
import {MaterialModule} from "../../material.module";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
