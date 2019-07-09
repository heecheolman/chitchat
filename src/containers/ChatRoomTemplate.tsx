import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { Store } from '../store';
import { Query } from 'react-apollo';
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

let subscription: any = null;

class ChatRoomTemplate extends React.Component<any, { chatRoomId: number; userId: number; content: string; }> {

  private _subscription: any = null;

  constructor(props: any) {
    super(props);
    const { match: { params }} = props;
    this.state = {
      chatRoomId: +params.id,
      userId: +Store.instance.id,
      content: '',
    }
  }

  onChange = (e: any) => {
    this.setState({
      content: e.target.value
    });
  };

  onClick = (e: any) => {
    this.setState({
      content: '',
    });

  };
  onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.setState({
        content: '',
      });
    }
  };

  render() {
    return (
      <>
        <Query query={MESSAGE_QUERY} variables={{ chatRoomId: this.state.chatRoomId }}>
          {
            ({ loading, data, subscribeToMore }: any) => {

              if (loading) {
                return null;
              }

              if (!this._subscription) {
                this._subscription = subscribeToMore({
                  document: MESSAGE_SUBSCRIPTION,
                  variables: {
                    chatRoomId: +this.state.chatRoomId
                  },
                  updateQuery(prev: any, { subscriptionData }: any) {
                    if (!subscriptionData.data) {
                      return prev;
                    }
                    const { messageCreated } = subscriptionData.data;
                    return {
                      ...prev,
                      messages: [
                        ...prev.messages,
                        messageCreated
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
                  <input type="text"
                         value={this.state.content}
                         onChange={this.onChange}
                         onKeyPress={this.onKeyPress} />
                  <button onClick={this.onClick}>전송</button>
                </>
              )
            }
          }
        </Query>

      </>
    )
  }
}

export default ChatRoomTemplate;

// const ChatRoomTemplate: React.FC<{ match: any }> = ({ match }) => {
//   console.log('ChatRoom Template Rendered!');
//   const [content, setContent] = useState('');
//
//   const chatRoomId = +match.params.id;
//   const userId = +Store.instance.id;
//   const mutation = useMutation(MESSAGE_MUTATION, {
//     variables: {
//       chatRoomId,
//       userId,
//       content
//     }
//   });
//   //
//   // useEffect(() => {
//   //   console.log('useEffect', subscription);
//   //   return () => subscription.unsubscribe()
//   // });
//
//   /** Input 이벤트 */
//   const onChange = (e: any) => {
//     setContent(e.target.value);
//   };
//   const onClick = () => {
//     setContent('');
//     mutation();
//   };
//   const onKeyPress = (e: any) => {
//     if (e.key === 'Enter') {
//       setContent('');
//       mutation();
//     }
//   };
//
//   /**
//    * 1. 채팅방에 들어오면 subscription 시작
//    * 2. 나가면 subscription 종료
//    * 3.
//    */
//
//   return (
//     <>
//       <Query query={MESSAGE_QUERY} variables={{ chatRoomId: +chatRoomId }}>
//         {
//           ({ loading, data, subscribeToMore }: any) => {
//
//             if (loading) {
//               return null;
//             }
//             // TODO subscribe 변경
//             // 현재 특정 채팅방만 subscribe 하고있음
//             if (!subscription) {
//               subscription = subscribeToMore({
//                 document: MESSAGE_SUBSCRIPTION,
//                 variables: {
//                   chatRoomId: +chatRoomId
//                 },
//                 updateQuery: (prev: any, { subscriptionData }: any) => {
//
//                   if (!subscriptionData.data) {
//                     return prev;
//                   }
//
//                   const { messageCreated } = subscriptionData.data;
//
//                   return {
//                     ...prev,
//                     messages: [
//                       ...prev.messages,
//                       messageCreated,
//                     ]
//                   }
//                 }
//               })
//             }
//
//             return (
              {/*<>*/}
                {/*<h3>ChatRoomTemplate :{ chatRoomId }</h3>*/}
                {/*<h4>메세지들</h4>*/}
                {/*<div>*/}
                  {/*{*/}
                    {/*data.messages.map(*/}
                      {/*(message: IMessage) =>*/}
                        {/*<Message key={message.id} message={message} />*/}
                      {/*)*/}
                  {/*}*/}
                {/*</div>*/}
                {/*<input type="text"*/}
                       {/*onChange={onChange}*/}
                {/*/>*/}
                {/*/!*<Input value={content}*!/*/}
                       {/*/!*onChange={onChange}*!/*/}
                       {/*/!*onClick={onClick}*!/*/}
                       {/*/!*onKeyPress={onKeyPress}*!/*/}
              {/*</>*/}
//             )
//           }
//         }
//
//       </Query>
//     </>
//   )
// };
//
// export default ChatRoomTemplate;
