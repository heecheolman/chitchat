import React from 'react';
import styles from '../containers/InChatRoomPage.module.scss';
import { IMessage } from '../interfaces';
import Message from './Message';
import moment from 'moment';

interface IProps {
  messages: IMessage[];
}

class MessageBox extends React.Component<any, any> {
  private readonly myRef: any;
  private _prevIndex: number = -1;
  private _curIndex: number = 0;
  private _refinedMessages: any[] = [];
  constructor(props: IProps) {
    super(props);
    this.myRef = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.messageRefining = this.messageRefining.bind(this);
    this.messageRefining(this.props.messages);
  }

  messageRefining(messages: IMessage[]) {
    let compMessage: IMessage;
    this._refinedMessages = messages.map((message: IMessage, i: number) => {
      compMessage = message;
      if (i === 0) {
        return {
          ...message,
          isAnotherUser: true,
          isSameMinute: false
        }
      }
      this._prevIndex = this._curIndex;
      this._curIndex = i;
      if (!!compMessage) {
        return {
          ...message,
          isAnotherUser: compMessage.createdBy.id !== message.createdBy.id,
          isSameMinute: moment(+compMessage.createdAt).format('mm') === moment(+message.createdAt).format('mm')
        }
      }
    });
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
        {this._refinedMessages.map((message: IMessage) => (
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
