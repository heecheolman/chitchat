import React from 'react';
import { Store } from '../store';
import { Query } from 'react-apollo';
import Input from '../components/Input';
import ChatHeader from '../components/ChatHeader';
import styles from './InChatRoomPage.module.scss';
import { MESSAGE_QUERY, MESSAGE_SUBSCRIPTION } from '../graphql-schema';
import MessageBox from '../components/MessageBox';

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
                },
              });
            }
            return (
              <>
                <ChatHeader
                  prevMeta={{ canPrev: true, url: '/chatrooms' }}
                  title={'채팅'}
                />
                <div className={styles.messageContainer}>
                  <MessageBox messages={data.messages} />
                  <Input
                    chatRoomId={this.state.chatRoomId}
                    userId={this.state.userId}
                  />
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
