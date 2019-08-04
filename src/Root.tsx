import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import EntryPage from './containers/EntryPage';
import client from './apolloClient';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import App from './App';
import InChatRoom from './containers/InChatRoom';
import ChatRoomList from './components/ChatRoomList/ChatRoomList';

const Root = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={EntryPage} />
            <Route exact path="/chatrooms" component={ChatRoomList} />
            <Route exact path="/chatrooms/:id" component={InChatRoom} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </App>
    </ApolloHooksProvider>
  </ApolloProvider>
);

export default Root;
