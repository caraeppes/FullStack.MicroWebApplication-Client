export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  connected: boolean;
  channels: string[];

  constructor(){
    this.username = "";
  }
}
