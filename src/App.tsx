import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import client from './apolloClient';

import MainFrame from './containers/MainFrame';
import { Store } from './store';
import { Redirect } from 'react-router';

Store.initState({
  userName: '',
});

class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <MainFrame />
      </div>
    );
  }
}

export default App;
