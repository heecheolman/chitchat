export interface IMessage {
  id: number;
  content: string;
  createdBy: {
    id: number;
    userName: string;
  };
  createdAt: string;
}
