import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import styles from './ChatRoom.module.scss';
import { useMutation } from 'react-apollo-hooks';
import { JOIN_USER_CHATROOM_MUTATION } from '../graphql-schema';
import { Store } from '../store';

const ChatRoom: React.FC<{ chatRoom: any }> = ({ chatRoom }) => {
  const joinChatRoomMutation = useMutation(JOIN_USER_CHATROOM_MUTATION, {
    variables: {
      chatRoomId: chatRoom.id,
      userId: +Store.instance.id,
    },
  });
  const exitChatRoomMutation = useMutation()
  useEffect(() => {
    return () => {
      // ... unmount
    }
  });

  return (
    <div className={styles.chatRoomWrap}>
      <Link
        className={styles.chatRoomLink}
        to={`/chatrooms/${chatRoom.id}`}
        onClick={() => joinChatRoomMutation()}
      >
        <div className={styles.chatRoomTitleWrap}>
          <div className={styles.chatRoomTitle}>
            {chatRoom.title}
          </div>
          <button
            type="button"
            className={styles.actionButton}
          >
            <IoIosMore/>
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
