import React from 'react';
import { IMessage } from '../interfaces';

/*
{
        "id": 0,
        "content": "wefewfe",
        "createdBy": {
          "id": 0,
          "userName": "heecheolman"
        },
        "createdAt": "1562418078163"
      },
 */

const Message: React.FC<{ message: IMessage }> = ({ message }) =>
  <>
    <div>
      <span>{message.createdBy.userName}: </span>
      <span>{message.content}</span>
      <span>{message.createdAt}</span>
    </div>
  </>;

export default Message;
