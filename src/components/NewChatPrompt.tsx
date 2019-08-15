import React from 'react';
import styles from './NewChatPrompt.module.scss';
import { FiX } from 'react-icons/fi';
import { Mutation } from 'react-apollo';
import { Store } from '../store';
import { CREATE_CHAT_ROOM_MUTATION } from '../graphql-schema';


export class NewChatPrompt extends React.Component<{ backdrop: boolean; setBackdrop: Function; }, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      userId: +Store.instance.id,
      title: '',
      description: '',
    };
  }

  setTitle(value: string): void {
    this.setState({
      title: value,
    });
  }

  setDescription(value: string): void {
    this.setState({
      description: value,
    });
  }

  createChatRoom(newChatMutation: any): void {
    newChatMutation();
    this.setTitle('');
    this.setDescription('');
    this.props.setBackdrop(false);
  }

  closePrompt(): void {
    this.setTitle('');
    this.setDescription('');
    this.props.setBackdrop(false);
  }

  get buttonDisabled() {
    return !this.state.title.length || !this.state.description.length;
  }

  render() {
    return (
      <div className={this.props.backdrop ? styles.backdrop : styles.displayNone}>
        <div className={styles.backdropNewChatWrap}>
          <div className={styles.newChatHeader}>
            <button className={styles.close} onClick={() => this.closePrompt()}><FiX /></button>
          </div>
          <div className={styles.newChatBody}>
            <div className="simple-input-wrap">
              <span className="simple-input-label">제목</span>
              <input className="simple-input" type="text" maxLength={20} placeholder="20자 이내로 작성해주세요."
                     value={this.state.title}
                     onChange={(e) => this.setTitle(e.target.value)} />
            </div>
            <div className="simple-input-wrap">
              <span className="simple-input-label">설명</span>
              <input className="simple-input" type="text" maxLength={30} placeholder="30자 이내로 작성해주세요."
                     value={this.state.description}
                     onChange={(e) => this.setDescription(e.target.value)}/>
            </div>
            <div className={styles.newChatActionButtonWrap}>
              <Mutation mutation={CREATE_CHAT_ROOM_MUTATION} variables={{
                userId: this.state.userId,
                title: this.state.title,
                description: this.state.description,
              }}>
                {(newChatMutation: any) => (
                  <button disabled={this.buttonDisabled}
                          className={`simple-button ${styles.newChatActionButton} ${this.buttonDisabled ? 'simple-button--disabled' : ''}`}
                          onClick={() => this.createChatRoom(newChatMutation)}
                  >생성</button>
                )}
              </Mutation>
            </div>
          </div>
          </div>
      </div>
    );
  }
}
