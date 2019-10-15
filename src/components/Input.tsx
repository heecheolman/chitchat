import React from 'react';
import { Mutation } from 'react-apollo';
import styles from './Input.module.scss';
import { FiArrowUp } from 'react-icons/fi';
import { CREATE_MESSAGE_MUTATION } from '../graphql-schema';


class Input extends React.Component<any, { chatRoomId: number; userId: number; content: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      chatRoomId: +this.props.chatRoomId,
      userId: +this.props.userId,
      content: ''
    };
  }

  get content(): string {
    return this.state.content;
  }
  get canContentSend(): boolean {
    return !!this.state.content && !!this.state.content.trim();
  }

  render() {
    return (
      <Mutation mutation={CREATE_MESSAGE_MUTATION}
                variables={{
                  chatRoomId: this.state.chatRoomId,
                  userId: this.state.userId,
                  content: this.content
                }}>
        {
          (mutation: Function) => {
            const onChange = (event: any) => {
              this.setState({
                content: event.target.value
              });
            };
            const onClick = () => {
              if (!this.canContentSend) {
                return;
              }
              mutation();
              this.setState({
                content: ''
              });
            };
            const onKeyPress = (event: any) => {
              if (!this.canContentSend) {
                return;
              }
              if (event.key === 'Enter') {
                mutation();
                this.setState({
                  content: ''
                });
              }
            };

            return (
              <div className={styles.inputWrap}>
                <div className={styles.messageInputWrap}>
                  <input
                    className={styles.messageInput}
                    type="text"
                    value={this.content}
                    placeholder="내용 입력"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                  />
                </div>
                <div className={styles.messageButtonWrap}>
                  <button
                    disabled={!this.canContentSend}
                    className={styles.messageButton}
                    onClick={onClick}
                  >
                    <FiArrowUp className={styles.messageSendIcon }/>
                  </button>
                </div>
              </div>
            )
          }
        }
      </Mutation>
    )
  }
}

export default Input;
