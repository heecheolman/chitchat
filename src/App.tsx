import React from 'react';
import { Store } from './store';
import ChatHeader from './components/ChatHeader';

Store.initState({
  userName: '',
  id: null,
});

const App: React.FC = (props) => (
  <div className="App">
    <div className="main-frame">
      {/*<ChatHeader />*/}
      <main className="main-wrap">{props.children}</main>
    </div>
  </div>
);

export default App;
