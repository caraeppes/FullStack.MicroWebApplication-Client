export class Channel {
  id: number;
  channelName: string;
  users = [];

  userString = '';
  private = false;

  constructor() {
  }
}
