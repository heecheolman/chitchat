import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../store';

const EntryTemplate: React.FC = () => {
  const [userName, setUserName] = useState('');

  return (
    <>
      닉네임 설정:
      <input type="text"
             onChange={(e) => setUserName(e.target.value)}
      />
      <Link to="chat-list">
        <button disabled={userName.length < 3}
                onClick={() => {
                  Store.setState({ userName });
                }}
        >채팅하러가기!</button>
      </Link>
    </>
  );
};

export default EntryTemplate;
