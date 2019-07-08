import React from 'react';
import styles from './MainFrame.module.scss';
import { Route, Switch } from 'react-router-dom';

import EntryTemplate from './EntryTemplate';
import ChatListTemplate from './ChatListTemplate';
import ChatRoomTemplate from './ChatRoomTemplate';
import { Store } from '../store';
import ChatHeader from '../components/ChatHeader';
import Test from './Test';

const MainFrame: React.FC = () => (
  <div className={styles['main-frame']}>
    <ChatHeader userName={Store.instance.userName}/>
    <Test />
    {/*<Switch>*/}
      {/*<Route path="/app" component={EntryTemplate} />*/}
      {/*<Route path="/chatrooms/:id" component={ChatRoomTemplate} />*/}
      {/*<Route path="/chatrooms" component={ChatListTemplate} />*/}
    {/*</Switch>*/}
  </div>
);

export default MainFrame;
