import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { Store } from '../store';

const CREATE_CHAT_ROOM = gql`
  mutation createChatRoom ($userId: Int!, $title: String!) {
    createChatRoom(userId: $userId, title: $title) {
      id
      title
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

const NewChat: React.FC = () => {
  console.log('NewChat Rendered!');
  const userId = +Store.instance.id;
  const mutation = useMutation(CREATE_CHAT_ROOM, {
    variables: {
      userId,
      title: '1번채팅방'
    },
    update: (proxy, { data }) => {
      console.log('create chatRoom data', data);
    }
  });

  return (
    <>
      <button onClick={() => {
        mutation();
      }}>새로운채팅 만들기</button>
    </>
  );
}

export default NewChat;
