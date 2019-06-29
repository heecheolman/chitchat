import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

interface IChat {
  id: number | string;
  writer: string;
  description: string;
}

const getChatting = gql`
  query {
    chatting {
      id
      writer
      description
    }
  }
`;

const newChat = gql`  
  subscription {
    newChat {
      id
      writer
      description
    }
  }
`;

export class ChatFrameTemplate extends React.Component {

  private _unsubscribe = null;

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Query query={getChatting}>
        {
          ({ loading, data, subscribeToMore }: any) => {
            if (loading) {
              return null;
            }
            if (!this._unsubscribe) {
              this._unsubscribe = subscribeToMore({
                document: newChat,
                updateQuery: (prev: any, { subscriptionData }: any) => {
                  if (!subscriptionData) {
                    return prev;
                  }
                  const { newChat } = subscriptionData.data;
                  return {
                    ...prev,
                    chatting: [
                      ...prev.chatting,
                      newChat
                    ]
                  }
                }
              });
            }
            return (
              <div>
                {data.chatting.map((chat: IChat) => (
                  <h3 key={chat.id}>
                    {chat.writer}: {chat.description}
                  </h3>
                ))}
              </div>
            )
          }
        }
      </Query>
    )
  }
}
