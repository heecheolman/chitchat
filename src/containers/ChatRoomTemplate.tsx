import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { Store } from '../store';
import { Query } from 'react-apollo';
import { IMessage } from '../interfaces';
import Message from '../components/Message';
import Input from '../components/Input';

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

const ChatRoomTemplate: React.FC<{ match: any; }> = ({
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
                <h3>ChatRoomTemplate :{ chatRoomId }</h3>
                <h4>메세지들</h4>
                <div>
                  {
                    data.messages.map((message: IMessage) =>
                      <Message key={message.id} message={message} />
                    )
                  }
                </div>
                <Input chatRoomId={chatRoomId}
                       userId={userId} />
              </>
            )
          }
        }
      </Query>
    </>
  );
};

export default ChatRoomTemplate;
