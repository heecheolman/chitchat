import React from 'react';
import styles from './MainFrame.module.scss';
import { Route } from 'react-router-dom';
import EntryTemplate from './EntryTemplate';
import ChatListTemplate from './ChatListTemplate';

const MainFrame: React.FC = () => (
  <div className={styles['main-frame']}>
      <Route path="/app" component={EntryTemplate} />
      <Route path="/chat-list" component={ChatListTemplate} />
  </div>
);

export default MainFrame;
