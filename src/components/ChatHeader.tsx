import React from 'react';
import styles from './ChatHeader.module.scss';

const ChatHeader: React.FC<{ userName: string }> = ({ userName }: any) => (
  <>
    <div className={styles['chat-header']}>
      {userName}
    </div>
  </>
);

export default ChatHeader;
