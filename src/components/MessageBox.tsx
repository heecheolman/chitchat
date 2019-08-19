import React from 'react';
import styles from '../containers/InChatRoomPage.module.scss';
import { IMessage } from '../interfaces';
import Message from './Message';

interface IProps {
  messages: IMessage[];
}

class MessageBox extends React.Component<any, any> {
  private readonly myRef: any;
  constructor(props: IProps) {
    super(props);
    this.myRef = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount(): void {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.myRef && this.myRef.current) {
      this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
    }
  }

  render() {
    return (
      <div
        className={styles.messageBoxWrap}
        ref={this.myRef}
      >
        {this.props.messages.map((message: IMessage) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
      </div>
    )
  }
}

export default MessageBox;
