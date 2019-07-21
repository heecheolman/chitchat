import React from 'react';
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

class ChatRoomTemplate extends React.Component<any, { chatRoomId: number; userId: number; content: string; }> {

  private _subscription: any = null;

  constructor(props: any) {
    super(props);
    const { match: { params }} = props;
    this.state = {
      chatRoomId: +params.id,
      userId: +Store.instance.id,
      content: '',
    };
  }

  render() {
    console.log('this._subscription, userId :: ', this._subscription, this.state.userId);
    return (
      <>
        <Query query={MESSAGE_QUERY} variables={{ chatRoomId: this.state.chatRoomId }}>
          {
            ({ loading, data, subscribeToMore }: any) => {
              if (loading) {
                return null;
              }

              console.log('data :: ', data);

              if (!this._subscription) {
                console.log('구독');
                this._subscription = subscribeToMore({
                  document: MESSAGE_SUBSCRIPTION,
                  variables: {
                    chatRoomId: +this.state.chatRoomId
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
                  <h3>ChatRoomTemplate :{ this.state.chatRoomId }</h3>
                  <h4>메세지들</h4>
                  <div>
                    {
                      data.messages.map((message: IMessage) =>
                        <Message key={message.id} message={message} />
                      )
                    }
                  </div>
                  <Input chatRoomId={this.state.chatRoomId}
                         userId={this.state.userId} />
                </>
              )
            }
          }
        </Query>

      </>
    )
  }

  componentWillUnmount(): void {
    this._subscription = null;
  }
}

export default ChatRoomTemplate;
