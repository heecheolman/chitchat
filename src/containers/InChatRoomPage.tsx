import React, { useEffect } from 'react';
import { Store } from '../store';
import { Query } from 'react-apollo';
import { IMessage } from '../interfaces';
import Message from '../components/Message';
import Input from '../components/Input';
import ChatHeader from '../components/ChatHeader';
import styles from './InChatRoomPage.module.scss';
import { MESSAGE_QUERY, MESSAGE_SUBSCRIPTION } from '../graphql-schema';

let subscription: any = null;

const InChatRoomPage: React.FC<{ match: any; }> = ({
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
                  <div className={styles.messageBoxWrap}>
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

export default InChatRoomPage;
