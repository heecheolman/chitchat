import React from 'react';
import styles from './MainFrame.module.scss';
import { Route, Switch } from 'react-router-dom';

import EntryTemplate from './EntryTemplate';
import ChatListTemplate from './ChatListTemplate';
import ChatRoomTemplate from './ChatRoomTemplate';

const MainFrame: React.FC = () => (
  <div className={styles['main-frame']}>
    <Switch>
      <Route path="/app" component={EntryTemplate} />
      <Route path="/chatrooms" component={ChatListTemplate} />
      <Route path="/chatrooms/:id" component={ChatRoomTemplate} />
    </Switch>
  </div>
);

export default MainFrame;
