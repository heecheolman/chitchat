import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { Store } from '../store';
import { Query } from 'react-apollo';
import { IMessage } from '../interfaces';
import Message from '../components/Message';
import Input from '../components/Input';

const MESSAGE_QUERY = gql`
  query messages($chatRoomId: Int!){
    messages(chatRoomId: $chatRoomId) {
      id
      content
      createdBy {
        id
        userName
      }
      createdAt
    }
  }
`;

const FOO_Fragment = gql`
  fragment foo on allDataQuery {
    foo: allData {
      foo
      bar
    }
  }
`;

const BAR_Fragment = gql`
  fragment bar on allDataQuery {
    bar: allData {
      foo
      bar
    }
  }
`;

const queryA = gql`
  query getAQuery {
    aList {
      a
      aa
      aaa
    }
  }
`;

const queryB = gql`
  query getBQuery {
    bList {
      b
      bb
      bbb
    }
  }
`;

const fragmentA = {
  fragmentName: 'fragmentA',
  fragment: gql`
    fragment fragA on getData {
      aList {
        a
        aa
        aaa
      }
    }
`
};

const fragmentB = {
  fragmentName: 'fragmentB',
  fragment: gql`
    fragment fragB on getData {
      bList {
        b
        bb
        bbb
      }
    }
`
};


const queryBuilder = (fragments: any[]) => {
  const fragmentGql: any[] = fragments.map(f => f.fragment);
  const fragmentNames = fragments.map(f => f.fragmentName);

  // let stringedNames = '';
  // fragmentNames.forEach(name => {
  //   stringedNames += `...${name}\n`
  // });
  //
  // let stringedFragments = '';
  // fragmentGql.forEach(fragment => {
  //   stringedFragments += `${fragment}\n`
  // });

  const foo = `${fragmentGql.join('\n')}`;
  console.log(foo);

  return gql`
    query getAllData {
      allData {
        ${fragmentGql.join('\n')}
      }
    }
  `

};

const MESSAGE_SUBSCRIPTION = gql`
  subscription messageCreated($chatRoomId: Int!) {
    createdMessage: messageCreated(chatRoomId: $chatRoomId) {
      id
      content
      createdBy {
        id
        userName
      }
      createdAt
    }
  }
`;

let subscription: any = null;

const ChatRoomTemplate: React.FC<{ match: any; }> = ({
  match
}) => {
  const chatRoomId = +match.params.id;
  const userId = +Store.instance.id;

  const mainQuery = queryBuilder([fragmentA, fragmentB]);
  console.log('mainQuery :: ', mainQuery);

  useEffect(() => {
    return () => {
      console.log('component will unmount');
      subscription = null;
    }
  });

  return (
    <>
      <Query query={MESSAGE_QUERY}
             variables={{ chatRoomId: +chatRoomId }}
             fetchPolicy={'network-only'}
      >
        {
          ({ loading, data, subscribeToMore }: any) => {
            if (loading) {
              return null;
            }

            if (!subscription) {
              subscription = subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: {
                  chatRoomId: +chatRoomId
                },
                updateQuery(prev: any, { subscriptionData }: any) {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const { createdMessage } = subscriptionData.data;
                  return {
                    ...prev,
                    messages: [
                      ...prev.messages,
                      createdMessage
                    ]
                  };
                },
              })
            }

            return (
              <>
                <h3>ChatRoomTemplate :{ chatRoomId }</h3>
                <h4>메세지들</h4>
                <div>
                  {
                    data.messages.map((message: IMessage) =>
                      <Message key={message.id} message={message} />
                    )
                  }
                </div>
                <Input chatRoomId={chatRoomId}
                       userId={userId} />
              </>
            )
          }
        }
      </Query>
    </>
  );
};

export default ChatRoomTemplate;
