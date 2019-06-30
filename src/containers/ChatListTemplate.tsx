import React from 'react';
import gql from 'graphql-tag';

import { Store } from '../store';
import ChatHeader from '../components/ChatHeader';
import NewChat from '../components/NewChat';
import { Query } from 'react-apollo';

const GET_CHAT_ROOMS = gql`
  query {
    chatRooms {
      id
      title
    }
  }
`;

const CHAT_ROOM_CREATED = gql`
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
  return (
    <>
      <Query query={GET_CHAT_ROOMS}>
        {({ loading, data, subscribeToMore }: any) => {

          if (loading) {
            return null;
          }

          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: CHAT_ROOM_CREATED,
              updateQuery: (prev: any, { subscriptionData }: any) => {
                if (!subscriptionData.data) {
                  return prev;
                }
                const { chatRoomCreated } = subscriptionData.data;
                console.log('prev', prev);
                console.log('chatRoomCreated', chatRoomCreated);
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
              <ChatHeader userName={Store.instance.userName} />
              {
                data.chatRooms.map((chatRoom: any, index: number) => {
                  return (
                    <li key={index}>{chatRoom.id}: {chatRoom.title}</li>
                  )
                })
              }
              <NewChat />
            </>
          )
        }}
      </Query>
    </>
  );
};

export default ChatListTemplate;
