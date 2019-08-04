import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ChatRoom.module.scss';

const ChatRoom: React.FC<{ chatRoom: any }> = ({ chatRoom }) => {
  console.log('chatRoom :: ', chatRoom);
  return (
    <div className={styles.chatRoomWrap}>
      <Link className={styles.chatRoomLink} to={`/chatrooms/${chatRoom.id}`}>
        <div className={styles.chatRoomTitle}>
          {chatRoom.title}
        </div>
        <div className={styles.chatRoomDescription}>
          설명설명설명설명설명설명설명설명설명설명설명설명설명설명
        </div>
      </Link>
    </div>
  )
};

export default ChatRoom;
