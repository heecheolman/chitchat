import React, { useState } from 'react';
import { Store } from '../store';
import styles from './EntryPage.module.scss';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';


/** createUser Mutation */
const CREATE_USER = gql`  
  mutation createUser($userName: String!) {
    createUser(userName: $userName) {
      id
      userName
    }
  }
`;

const EntryPage: React.FC = () => {
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
      <div className={styles.entryContainer}>
        <input type="text"
               className={styles.nickNameInput}
               placeholder="닉네임을 설정해주세요!"
               onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className={styles.entryContainer}>
        {
          userName.length > 4 &&
          <Link to="/chatrooms">
            <button className={styles.linkButton}
                    onClick={() => {
                      Store.setState({ userName });
                      mutation();
                    }
                    }>
              채팅하러가기
            </button>
          </Link>
        }
      </div>
    </>
  );
};

export default EntryPage;
