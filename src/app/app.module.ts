import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFileUploadModule } from "angular-material-fileupload";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFileUploadModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
