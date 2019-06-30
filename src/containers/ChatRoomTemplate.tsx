import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { Store } from '../store';
import { Query } from 'react-apollo';

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

  const chatRoomId = match.params.id;
  const [content, setContent] = useState('');
  console.log('Store.instance.id', Store.instance.id);
  const mutation = useMutation(MESSAGE_MUTATION, {
    variables: {
      chatRoomId: +chatRoomId,
      userId: +Store.instance.id,
      content
    }
  });

  console.log('chatRoomId', chatRoomId);

  return (
    <Query query={MESSAGE_QUERY} variables={{ chatRoomId: +chatRoomId }}>
      {
        ({ loading, data, subscribeToMore }: any) => {

          if (loading) {
            return null;
          }

          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: MESSAGE_SUBSCRIPTION,
              variables: {
                chatRoomId: +chatRoomId
              },
              updateQuery: (prev: any, { subscriptionData }: any) => {

                if (subscriptionData.data) {
                  return prev;
                }

                const { messageCreated } = subscriptionData.data;
                console.log('prevprev', prev);
                // TODO
                return {
                  prev
                }
              }
            })
          }


          return (
            <>
              <h3>ChatRoomTemplate :{ chatRoomId }</h3>
              <pre>


              </pre>
              <input type="text"
                     onChange={(e) => {
                       setContent(e.target.value);
                     }} />
              <button onClick={() => {
                mutation();
                setContent('');
              }}>전송</button>
            </>
          )
        }
      }

    </Query>
  )
};

export default ChatRoomTemplate;
