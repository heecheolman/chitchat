import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import NewChat from '../components/NewChat';
import styles from './ChatListTemplate.module.scss';

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

const ChatListTemplate: React.FC = () => {
  console.log('ChatListTemplate Rendered!');
  return (
    <>
      <Query query={CHAT_ROOMS_QUERY}>
        {({ loading, data, subscribeToMore }: any) => {

          if (loading) {
            return null;
          }

          console.log('unsubscribe', unsubscribe);

          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: CHAT_ROOM_SUBSCRIPTION,
              updateQuery: (prev: any, { subscriptionData }: any) => {
                if (!subscriptionData.data) {
                  return prev;
                }
                const { chatRoomCreated } = subscriptionData.data;
                console.log('prev', prev);
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
              <ul className={styles['chat-rooms']}>
                {
                  data.chatRooms.map((chatRoom: any, index: number) => {
                    return (
                      <Link to={`/chatrooms/${chatRoom.id}`} key={index}>
                        <li className={styles['chat-rooms__room']}>{chatRoom.id}: {chatRoom.title}</li>
                      </Link>
                    )
                  })
                }
              </ul>
              <NewChat />
            </>
          )
        }}
      </Query>
    </>
  );
};

export default ChatListTemplate;
