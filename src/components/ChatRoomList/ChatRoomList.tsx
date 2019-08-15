import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FiX } from 'react-icons/fi';

import NewChat from '../NewChat';
import styles from './ChatRoomList.module.scss';
import ChatRoom from './ChatRoom';
import { useMutation } from 'react-apollo-hooks';
import { Store } from '../../store';
import ChatHeader from '../ChatHeader';

const CHAT_ROOMS_QUERY = gql`
  query {
    chatRooms {
      id
      title
      description
    }
  }
`;

const CHAT_ROOM_SUBSCRIPTION = gql`
  subscription {
    chatRoomCreated {
      id
      title
      description
      users {
        id
        userName
      }
    }
  }
`;

const CREATE_CHAT_ROOM = gql`
    mutation createChatRoom ($userId: Int!, $title: String!, $description: String!) {
        createChatRoom(userId: $userId, title: $title, description: $description) {
            id
            title
            description
            users {
                id
                userName
            }
            messages {
                id
                content
                createdBy {
                    id
                    userName
                }
                createdAt
            }
        }
    }
`;

let unsubscribe: any = null;

const ChatRoomList: React.FC = () => {
  const [backdrop, setBackdrop] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [roomDesc, setRoomDesc] = useState('');
  const userId = +Store.instance.id;

  const newChatMutation = useMutation(CREATE_CHAT_ROOM, {
    variables: {
      userId,
      title: roomTitle,
      description: roomDesc,
    },
    update: (proxy, { data }) => {
    }
  });

  const createButtonDisabled = !roomTitle.length || !roomDesc.length;

  const newChat = () => {
    console.log('newChat Called');
    newChatMutation();
    setRoomTitle('');
    setRoomDesc('');
    setBackdrop(false);
  };

  return (
    <>
      <Query query={CHAT_ROOMS_QUERY}
             fetchPolicy={'network-only'}
      >
        {({ loading, data, subscribeToMore }: any) => {
          if (loading) {
            return null;
          }
          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
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
              <div className={backdrop ? styles.backdrop : styles.displayNone}>
                <div className={styles.backdropNewChatWrap}>
                  <div className={styles.newChatHeader}>
                    <button className={styles.close} onClick={() => setBackdrop(false)}><FiX /></button>
                  </div>
                  <div className={styles.newChatBody}>
                    <div className="simple-input-wrap">
                      <span className="simple-input-label">제목</span>
                      <input className="simple-input" type="text" maxLength={20} placeholder="20자 이내로 작성해주세요."
                             value={roomTitle}
                             onChange={(e) => setRoomTitle(e.target.value)} />
                    </div>
                    <div className="simple-input-wrap">
                      <span className="simple-input-label">설명</span>
                      <input className="simple-input" type="text" maxLength={30} placeholder="30자 이내로 작성해주세요."
                             value={roomDesc}
                             onChange={(e) => setRoomDesc(e.target.value)}/>
                    </div>
                    <div className={styles.newChatActionButtonWrap}>
                      <button disabled={createButtonDisabled}
                              className={`simple-button ${styles.newChatActionButton} ${createButtonDisabled ? 'simple-button--disabled' : ''}`}
                              onClick={() => newChat()}
                      >생성</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.chatRooms}>
                {
                  data.chatRooms.map((chatRoom: any) => (
                    <ChatRoom key={chatRoom.id} chatRoom={chatRoom} />
                  ))
                }
              </div>
              <NewChat backdrop={setBackdrop} />
            </>
          )
        }}
      </Query>
    </>
  );
};

export default ChatRoomList;
