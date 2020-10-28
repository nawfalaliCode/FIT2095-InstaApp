import { Component } from "@angular/core";
import * as io from "socket.io-client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "instaApp";
  images = [];
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect();
  }

  ngOnInit() {
    this.socket.on("urls", (data) => {
      this.images = data;
      console.log(this.images);
    });

    this.socket.on("newImage", (data) => {
      this.images.push(data);
    });
  }
}
