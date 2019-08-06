import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './Input.module.scss';
import { FiArrowUp } from 'react-icons/fi';

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

class Input extends React.Component<any, { chatRoomId: number; userId: number; content: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      chatRoomId: +this.props.chatRoomId,
      userId: +this.props.userId,
      content: ''
    };
  }

  render() {
    return (
      <Mutation mutation={MESSAGE_MUTATION}
                variables={{
                  chatRoomId: this.state.chatRoomId,
                  userId: this.state.userId,
                  content: this.state.content
                }}>
        {
          (mutation: Function, { loading }: any) => {
            const onChange = (event: any) => {
              this.setState({
                content: event.target.value
              });
            };
            const onClick = () => {
              mutation();
              this.setState({
                content: ''
              });
            };
            const onKeyPress = (event: any) => {
              if (event.key === 'Enter') {
                mutation();
                this.setState({
                  content: ''
                });
              }
            };

            return (
              <>
                <div className={styles.messageInputWrap}>
                  <input className={styles.messageInput}
                         type="text"
                         value={this.state.content}
                         placeholder="내용 입력"
                         onChange={onChange}
                         onKeyPress={onKeyPress}
                  />
                </div>
                <div className={styles.messageButtonWrap}>
                  <button className={styles.messageButton} onClick={onClick}><FiArrowUp className={styles.messageSendIcon} /></button>
                </div>
              </>
            )
          }
        }
      </Mutation>
    )
  }
}

export default Input;
