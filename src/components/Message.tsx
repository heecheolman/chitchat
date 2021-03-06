import React from 'react';
import styles from './Message.module.scss';
import moment from 'moment';
import { Store } from '../store';

const Message: React.FC<{ message: any }> = ({ message }) => {
  const isMe = +Store.instance.id === message.createdBy.id;
  return (
    <>
      <div className={`${styles.messageBox} ${isMe ? styles.messageAlignRight : styles.messageAlignLeft}`}>
        <span className={styles.userName}>{message.createdBy.userName}</span>
        <div className={styles.messageContentBox}>
          <span className={styles.message}>{message.content}</span>
        </div>
        <span className={styles.timestamp}>{moment(parseInt(message.createdAt)).format('a hh:mm:ss')}</span>
      </div>
    </>
  )
};

export default Message;
