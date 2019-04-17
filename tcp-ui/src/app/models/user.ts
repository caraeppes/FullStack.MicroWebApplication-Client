export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  channels: string[];

  constructor(){
    this.username = "";
  }
}
