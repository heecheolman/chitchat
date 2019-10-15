export interface IMessage {
  id: number;
  content: string;
  createdBy: IUser;
  createdAt: string;
}

export interface IUser {
  id: number;
  userName: string;
}

export interface IChatRoom {
  id: number;
  title: string;
  description: string;
  users: IUser[];
  messages: IMessage[];
}