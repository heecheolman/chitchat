import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import NewChat from '../NewChat';
import styles from './ChatRoomList.module.scss';
import ChatRoom from './ChatRoom';

const CHAT_ROOMS_QUERY = gql`
  query {
    chatRooms {
      id
      title
    }
  }
`;

const CHAT_ROOM_SUBSCRIPTION = gql`
  subscription {
    chatRoomCreated {
      id
      title
      users {
        id
        userName
      }
    }
  }
`;

let unsubscribe: any = null;

const ChatRoomList: React.FC = () => {
  const [backdrop, setBackdrop] = useState(false);

  return (
    <>
      <Query query={CHAT_ROOMS_QUERY}>
        {({ loading, data, subscribeToMore }: any) => {
          if (loading) {
            return null;
          }
          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: CHAT_ROOM_SUBSCRIPTION,
              updateQuery: (prev: any, { subscriptionData }: any) => {
                if (!subscriptionData.data) {
                  return prev;
                }
                const { chatRoomCreated } = subscriptionData.data;
                return {
                  ...prev,
                  chatRooms: [
                    ...prev.chatRooms,
                    chatRoomCreated
                  ]
                }
              }
            });
          }
          return (
            <>
              <div className={backdrop ? styles.backdrop : styles.displayNone}>
                <div className={styles.backdropNewChatWrap}>
                  <div className={styles.newChatHeader}>
                    <button className={styles.close} onClick={() => setBackdrop(false)}><FiX /></button>
                  </div>
                </div>
              </div>
              <div className={styles.chatRooms}>
                {
                  data.chatRooms.map((chatRoom: any) => (
                    <ChatRoom key={chatRoom.id} chatRoom={chatRoom} />
                  ))
                }
              </div>
              <NewChat backdrop={setBackdrop} />
            </>
          )
        }}
      </Query>
    </>
  );
};

export default ChatRoomList;
