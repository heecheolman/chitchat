import React from 'react';
import styles from './ChatHeader.module.scss';
import { FiChevronLeft } from 'react-icons/fi';
import { Store } from '../store';

const ChatHeader: React.FC = () => {
  const userName = Store.instance.userName;
  return (
    <>
      <div className={styles.chatHeader}>
        <div className={styles.buttonBox}>
          <button className={styles.prevButtonWrap}><FiChevronLeft className={styles.prevButtonIcon} />이전</button>
        </div>
        <div className={styles.userNameWrap}>
          <span className={styles.userName}>{userName || 'heecheolman'}</span>
        </div>
        <div className={styles.buttonBox} />
      </div>
    </>
  );
}

export default ChatHeader;
