import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import EntryPage from './containers/EntryPage';
import client from './apolloClient';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import App from './App';
import InChatRoom from './containers/InChatRoom';
import ChatRoomPage from './containers/ChatRoomPage';
import PrivateRoute from './containers/PirvateRoute';

const Root = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={EntryPage} />
            <PrivateRoute exact component={ChatRoomPage} path='/chatrooms' />
            <PrivateRoute exact component={InChatRoom} path='/chatrooms/:id' />
          </Switch>
        </BrowserRouter>
      </App>
    </ApolloHooksProvider>
  </ApolloProvider>
);

export default Root;
