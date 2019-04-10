import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../material.module";
import {FormsModule} from "@angular/forms";
import {MessageComponent} from "./message.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent]
})
export class MessageModule { }
