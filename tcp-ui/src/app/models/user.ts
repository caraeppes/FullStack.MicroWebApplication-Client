import {PrivateChannel} from "./private-channel";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  connected: boolean;
  channels: string[];
  privateChannels: PrivateChannel[];

  constructor(){
    this.username = "";
  }
}
