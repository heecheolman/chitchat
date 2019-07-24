import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../store';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';


/** createUser Mutation */
const CREATE_USER = gql`  
  mutation createUser($userName: String!) {
    createUser(userName: $userName) {
      id
      userName
    }
  }
`;

const EntryTemplate: React.FC = () => {
  const [userName, setUserName] = useState('');
  const mutation = useMutation(CREATE_USER, {
    variables: {
      userName
    },
    update: (proxy, { data }) => {
      const { id, userName } = data.createUser;
      Store.setState({ id, userName });
    }
  });

  return (
    <>
      닉네임 설정:
      <input type="text"
             onChange={(e) => setUserName(e.target.value)}
      />
      <Link to="chatrooms">
        <button disabled={userName.length < 3}
                onClick={() => {
                  Store.setState({ userName });
                  mutation();
                }}
        >채팅하러가기!</button>
      </Link>
    </>
  );
};

export default EntryTemplate;
