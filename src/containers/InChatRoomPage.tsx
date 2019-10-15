import React from 'react';
import { Store } from '../store';
import { Query } from 'react-apollo';
import Input from '../components/Input';
import ChatHeader from '../components/ChatHeader';
import styles from './InChatRoomPage.module.scss';
import { CHATROOM_INFO_SUBSCRIPTION, CHATROOM_QUERY } from '../graphql-schema';
import MessageBox from '../components/MessageBox';
import { IChatRoom, IMessage, IUser } from '../interfaces';

interface IState {
  chatRoomId: number;
  userId: number;
}

class InChatRoomPage extends React.Component<any, IState> {
  private subscription: any = null;
  private prevUsers: IUser[] = [];

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
        query={CHATROOM_QUERY}
        variables={{ chatRoomId: this.state.chatRoomId }}
        fetchPolicy={'network-only'}
      >
        {
          ({ loading, data, subscribeToMore }: {
            loading: any;
            data: {
              chatRoom: IChatRoom;
            };
            subscribeToMore: any;
          }) => {
            if (loading) {
              return null;
            }
            const {
              messages,
              users
            }: {
              messages: IMessage[],
              users: IUser[],
            } = data.chatRoom;
            this.prevUsers = users;

            if (!this.subscription) {
              this.subscription = subscribeToMore({ document: CHATROOM_INFO_SUBSCRIPTION,
                variables: {
                  chatRoomId: this.state.chatRoomId,
                },
                updateQuery(prev: any, { subscriptionData }: any) {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const {
                    chatRoom: {
                      users: prevUsers,
                    }
                  } = prev;
                  const chatRoomInfo = subscriptionData.data.chatRoomInfo as IChatRoom;
                  const {
                    messages,
                    users,
                  } = chatRoomInfo;

                  const prevUserIds = prevUsers.map((u: IUser) => u.id);
                  const userIds = users.map((u: IUser) => u.id);
                  const [newUserId] = userIds.filter(id => !prevUserIds.includes(id));
                  const foundUser = users.find((user: IUser) => user.id === newUserId);

                  return {
                    ...prev,
                    messages: [
                      ...messages
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
                  <MessageBox messages={messages}/>
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
