import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import styles from './ChatRoom.module.scss';

const ChatRoom: React.FC<{ chatRoom: any }> = ({ chatRoom }) => {
  return (
    <div className={styles.chatRoomWrap}>
      <Link
        className={styles.chatRoomLink}
        to={`/chatrooms/${chatRoom.id}`}
      >
        <div className={styles.chatRoomTitleWrap}>
          <div className={styles.chatRoomTitle}>
            {chatRoom.title}
          </div>
          <button className={styles.actionButton}>
            <IoIosMore />
          </button>
        </div>
        <div className={styles.chatRoomDescription}>
          {chatRoom.description}
        </div>
      </Link>
    </div>
  )
};

export default ChatRoom;
