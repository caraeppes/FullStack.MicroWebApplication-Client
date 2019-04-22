export class PrivateChannel {
  id: number;
  channelName: string;
  users = [];

  constructor(){
    this.users = [];
  }
}
