interface IMessage {
  id: number;
  content: string;
  createdBy: {
    id: number;
    userName: string;
  };
  createdAt: string;
}

export function messageComparator(messages: IMessage[]) {
  if (messages.length < 1) {
    return messages;
  }
  let prevMessage: IMessage = messages[0];

}
