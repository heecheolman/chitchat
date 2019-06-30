import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import client from './apolloClient';

import MainFrame from './containers/MainFrame';
import { Store } from './store';

Store.initState({
  userName: '',
  id: null,
});

class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <div className="App">
            <MainFrame />
          </div>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;
