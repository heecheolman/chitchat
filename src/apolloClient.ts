import { ApolloClient, HttpLink, split } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-boost';

const BASE_URL = 'localhost';
const HTTP_URI = `http://${BASE_URL}:4000`;
const WS_URI = `ws://${BASE_URL}:4000`;

const httpLink = new HttpLink({
  uri: HTTP_URI
});

const wsLink = new WebSocketLink({
  uri: WS_URI,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink,
  );

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

export default client;

