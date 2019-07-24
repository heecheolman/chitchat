import React from 'react';
import styles from './MainFrame.module.scss';
import { Redirect, Route, Switch } from 'react-router-dom';

import EntryTemplate from './EntryTemplate';
import ChatListTemplate from './ChatListTemplate';
import ChatRoomTemplate from './ChatRoomTemplate';
import ChatHeader from '../components/ChatHeader';

const MainFrame: React.FC = () => (
  <div className={styles['main-frame']}>
    <ChatHeader />
    <Switch>
      <Route path="/app" component={EntryTemplate} />
      <Route exact path="/chatrooms/:id" component={ChatRoomTemplate} />
      <Route exact path="/chatrooms" component={ChatListTemplate} />
      <Redirect to="/app" />
    </Switch>
  </div>
);

export default MainFrame;
