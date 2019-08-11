import React from 'react';
import { IMessage } from '../interfaces';
import styles from './Message.module.scss';
import moment from 'moment';
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
    <div className={styles.messageBox}>
      <span className={styles.userName}>{message.createdBy.userName}</span>
      <div className={styles.messageContentBox}>
        <span className={styles.message}>{message.content}</span>
        <span className={styles.timestamp}>{moment(parseInt(message.createdAt)).format('a hh:mm:ss')}</span>
      </div>
    </div>
  </>;

export default Message;
