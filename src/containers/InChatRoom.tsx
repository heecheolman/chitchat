import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { Store } from '../store';
import { Query } from 'react-apollo';
import { IMessage } from '../interfaces';
import Message from '../components/Message';
import Input from '../components/Input';
import ChatHeader from '../components/ChatHeader';
import styles from './InChatRoom.module.scss';

const MESSAGE_QUERY = gql`
  query messages($chatRoomId: Int!){
    messages(chatRoomId: $chatRoomId) {
      id
      content
      createdBy {
        id
        userName
      }
      createdAt
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription messageCreated($chatRoomId: Int!) {
    createdMessage: messageCreated(chatRoomId: $chatRoomId) {
      id
      content
      createdBy {
        id
        userName
      }
      createdAt
    }
  }
`;

let subscription: any = null;

const InChatRoom: React.FC<{ match: any; }> = ({
  match
}) => {
  const chatRoomId = +match.params.id;
  const userId = +Store.instance.id;

  useEffect(() => {
    return () => {
      subscription = null;
    }
  });

  return (
    <>
      <Query query={MESSAGE_QUERY}
             variables={{ chatRoomId: +chatRoomId }}
             fetchPolicy={'network-only'}
      >
        {
          ({ loading, data, subscribeToMore }: any) => {
            if (loading) {
              return null;
            }

            if (!subscription) {
              subscription = subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: {
                  chatRoomId: +chatRoomId
                },
                updateQuery(prev: any, { subscriptionData }: any) {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const { createdMessage } = subscriptionData.data;
                  return {
                    ...prev,
                    messages: [
                      ...prev.messages,
                      createdMessage
                    ]
                  };
                },
              })
            }

            return (
              <>
                <ChatHeader prevMeta={{ canPrev: true, url: '/chatrooms' }} title={'채팅'} />
                <div className={styles.messageContainer}>
                  <div>
                    {
                      data.messages.map((message: IMessage) =>
                        <Message key={message.id} message={message} />
                      )
                    }
                  </div>
                  <div className={styles.inputWrap}>
                    <Input chatRoomId={chatRoomId}
                           userId={userId} />
                  </div>
                </div>
              </>
            )
          }
        }
      </Query>
    </>
  );
};

export default InChatRoom;
