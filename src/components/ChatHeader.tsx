import React from 'react';
import styles from './ChatHeader.module.scss';
import { Route } from 'react-router';

const ChatHeader: React.FC<{ userName: string }> = ({ userName }: { userName: string }) => (
  <>
    <div className={styles['chat-header']}>
      <Route render={({ history }) => (
        <>
          <button onClick={() => {history.goBack()}}>이전으로</button>
          {userName}
        </>
      )}>
      </Route>
    </div>
  </>
);

export default ChatHeader;
