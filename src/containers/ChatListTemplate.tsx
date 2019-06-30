import React from 'react';
import { Store } from '../store';

import ChatHeader from '../components/ChatHeader';
import NewChat from '../components/NewChat';

const ChatListTemplate: React.FC = () => (
  <>
    <ChatHeader userName={Store.instance.userName} />
    <NewChat />
  </>
);

export default ChatListTemplate;
