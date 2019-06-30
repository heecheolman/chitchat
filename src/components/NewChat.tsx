import React from 'react';

const NewChat: React.FC = () => (
  <>
    <button onClick={() => {
      const chatRoomTitle = prompt('채팅방 입력');

    }}>새로운채팅 만들기</button>
  </>
);

export default NewChat;
