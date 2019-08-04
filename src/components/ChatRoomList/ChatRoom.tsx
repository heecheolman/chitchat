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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </div>
      </Link>
    </div>
  )
};

export default ChatRoom;
