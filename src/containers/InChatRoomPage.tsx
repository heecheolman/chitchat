import React from 'react';
import { Store } from '../store';
import { Query } from 'react-apollo';
import { IMessage } from '../interfaces';
import Message from '../components/Message';
import Input from '../components/Input';
import ChatHeader from '../components/ChatHeader';
import styles from './InChatRoomPage.module.scss';
import { MESSAGE_QUERY, MESSAGE_SUBSCRIPTION } from '../graphql-schema';

interface IState {
  chatRoomId: number;
  userId: number;
}

class InChatRoomPage extends React.Component<any, IState> {
  private subscription: any = null;

  constructor(props: any) {
    super(props);
    const { match } = props;
    this.state = {
      chatRoomId: +match.params.id,
      userId: +Store.instance.id,
    };
  }

  componentWillUnmount(): void {
    this.subscription = null;
  }

  render() {
    return (
      <Query
        query={MESSAGE_QUERY}
        variables={{ chatRoomId: this.state.chatRoomId }}
        fetchPolicy={'network-only'}
      >
        {
          ({ loading, data, subscribeToMore }: any) => {
            if (loading) {
              return null;
            }
            if (!this.subscription) {
              this.subscription = subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: {
                  chatRoomId: this.state.chatRoomId,
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
                      createdMessage,
                    ]
                  };
                }
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
                    <Input chatRoomId={this.state.chatRoomId}
                           userId={this.state.userId} />
                  </div>
                </div>
              </>
            )
          }
        }
      </Query>
    );
  }
}

export default InChatRoomPage;
