import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {UsersComponent} from "./users.component";
import {MaterialModule} from "../../material.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})
export class UsersModule {
}
