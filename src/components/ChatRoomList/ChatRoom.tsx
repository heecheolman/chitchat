import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ChatRoom.module.scss';

const ChatRoom: React.FC<{ chatRoom: any }> = ({ chatRoom }) => {
  console.log('chatRoom :: ', chatRoom);
  return (
    <div className={styles.chatRoomWrap}>
      <Link className={styles.chatRoomLink} to={`/chatrooms/${chatRoom.id}`}>
        {chatRoom.title}
      </Link>
    </div>
  )
};

export default ChatRoom;
