import React from 'react';
import styles from './NewChat.module.scss';

const NewChat: React.FC<{ backdrop: any }> = ({ backdrop }) =>
  <div className={styles.newChatWrap}>
    <button className={`simple-button ${styles.newChatButton}`}
            onClick={() => {
              backdrop(true);
            }}>새로운채팅</button>
  </div>;

export default NewChat;
