import React, { useState } from 'react';
import { Store } from '../store';
import styles from './EntryTemplate.module.scss';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { FiChevronRight } from 'react-icons/fi';


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
      <div className={styles.entryContainer}>
        <input type="text"
               className={styles.nickNameInput}
               placeholder="닉네임을 설정해줘!"
               onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className={styles.entryContainer}>
        {
          userName.length > 4 &&
          <button className={styles.linkButton}
                  onClick={() => {
                    Store.setState({ userName });
                    mutation();
                  }
          }>chitchat
            <FiChevronRight />
          </button>
        }
      </div>
    </>
  );
};

export default EntryTemplate;
