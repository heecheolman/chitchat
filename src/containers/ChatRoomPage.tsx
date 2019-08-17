import React from 'react';
import { Query } from 'react-apollo';
import styles from './ChatRoomPage.module.scss';
import ChatRoom from './../components/ChatRoom';
import { Store } from '../store';
import ChatHeader from '../components/ChatHeader';
import { NewChatPrompt } from '../components/NewChatPrompt';
import { CHAT_ROOM_SUBSCRIPTION, CHAT_ROOMS_QUERY } from '../graphql-schema';

let subscription: any = null;

class ChatRoomPage extends React.Component<any, { userId: number; backdrop: boolean; }> {
  constructor(props: any) {
    super(props);
    this.state = {
      userId: +Store.instance.id,
      backdrop: false,
    };
  }

  setBackdrop = (hasBackdrop: boolean): void => {
    this.setState({
      backdrop: hasBackdrop,
    });
  };

  componentWillUnmount(): void {
    subscription = null;
  }

  render() {
    return (
      <>
        <Query query={CHAT_ROOMS_QUERY}
               fetchPolicy={'network-only'}
        >
          {({ loading, data, subscribeToMore }: any) => {
            if (loading) {
              return null;
            }
            if (!subscription) {
              subscription = subscribeToMore({
                document: CHAT_ROOM_SUBSCRIPTION,
                updateQuery: (prev: any, { subscriptionData }: any) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const { chatRoomCreated } = subscriptionData.data;
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
                <ChatHeader prevMeta={{ canPrev: true, url: '/' }} title={'채팅목록'} />
                <NewChatPrompt backdrop={this.state.backdrop} setBackdrop={this.setBackdrop} />
                <div className={styles.chatRooms}>
                  {
                    data.chatRooms.map((chatRoom: any) => (
                      <ChatRoom key={chatRoom.id} chatRoom={chatRoom} />
                    ))
                  }
                </div>
                <div className={styles.newChatWrap}>
                  <button className={`simple-button ${styles.newChatButton}`}
                          onClick={() => this.setBackdrop(true)}>새로운채팅</button>
                </div>
              </>
            )
          }}
        </Query>
      </>
    );
  };
}

export default ChatRoomPage;
