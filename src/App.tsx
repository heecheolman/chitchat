import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ChatFrameTemplate } from './components/templates/chat-frame-template';
import InputChat from './components/templates/input-chat';

import client from './apolloClient';

class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <div className="App">
            <ChatFrameTemplate />
            <InputChat />
          </div>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;
