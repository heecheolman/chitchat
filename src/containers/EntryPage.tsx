import React, { useState } from 'react';
import { Store } from '../store';
import styles from './EntryPage.module.scss';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_USER_MUTATION } from '../graphql-schema';
import { History } from 'history';



const EntryPage: React.FC<{ history: History }> = ({ history }) => {
  const [userName, setUserName] = useState('');
  const mutation = useMutation(CREATE_USER_MUTATION, {
    variables: {
      userName
    },
    update: (proxy, { data }) => {
      const { id, userName } = data.createUser;
      Store.setState({ id, userName });
      history.push('/chatrooms');
    }
  });
  return (
    <>
      <div className={styles.entryContainer}>
        <input
          type="text"
          className={styles.nickNameInput}
          placeholder="닉네임을 설정해주세요!"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className={styles.entryContainer}>
        {userName.length > 4 &&
        <button
          className={styles.linkButton}
          onClick={() => mutation()}
        >
          채팅하러가기
        </button>
        }
      </div>
    </>
  );
};

export default EntryPage;
