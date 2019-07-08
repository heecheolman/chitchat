import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { Store } from '../store';
import { Query } from 'react-apollo';
import Input from '../components/Input';
import { IMessage } from '../interfaces';
import Message from '../components/Message';

const MESSAGE_MUTATION = gql`
  mutation createMessage($chatRoomId: Int!, $userId: Int!, $content: String!) {
    createMessage(chatRoomId: $chatRoomId, userId: $userId, content: $content) {
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
    messageCreated(chatRoomId: $chatRoomId) {
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

let unsubscribe: any = null;

const ChatRoomTemplate: React.FC<{ match: any }> = ({ match }) => {
  console.log('ChatRoom Template Rendered!');
  const [content, setContent] = useState('');

  const chatRoomId = +match.params.id;
  const userId = +Store.instance.id;
  const mutation = useMutation(MESSAGE_MUTATION, {
    variables: {
      chatRoomId,
      userId,
      content
    }
  });

  /** Input 이벤트 */
  const onChange = (e: any) => {
    setContent(e.target.value);
  };
  const onClick = () => {
    setContent('');
    mutation();
  };
  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setContent('');
      mutation();
    }
  };

  /**
   * 1. 채팅방에 들어오면 subscription 시작
   * 2. 나가면 subscription 종료
   * 3.
   */

  return (
    <>
      <Query query={MESSAGE_QUERY} variables={{ chatRoomId: +chatRoomId }}>
        {
          ({ loading, data, subscribeToMore }: any) => {

            if (loading) {
              return null;
            }
            // TODO subscribe 변경
            // 현재 특정 채팅방만 subscribe 하고있음
            if (!unsubscribe) {
              unsubscribe = subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: {
                  chatRoomId: +chatRoomId
                },
                updateQuery: (prev: any, { subscriptionData }: any) => {

                  if (!subscriptionData.data) {
                    return prev;
                  }

                  const { messageCreated } = subscriptionData.data;
                  console.log('prev :: ', prev);

                  return {
                    ...prev,
                    messages: [
                      ...prev.messages,
                      messageCreated,
                    ]
                  }
                }
              })
            }

            return (
              <>
                <h3>ChatRoomTemplate :{ chatRoomId }</h3>
                <h4>메세지들</h4>
                <div>
                  {
                    data.messages.map(
                      (message: IMessage) =>
                        <Message key={message.id} message={message} />
                      )
                  }
                </div>
                <Input value={content}
                       onChange={onChange}
                       onClick={onClick}
                       onKeyPress={onKeyPress}
                />
              </>
            )
          }
        }

      </Query>
    </>
  )
};

export default ChatRoomTemplate;
