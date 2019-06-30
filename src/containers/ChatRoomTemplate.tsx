import React from 'react';

const ChatRoomTemplate: React.FC<{ match: any }> = ({ match }) => {

  const chatRoomId = match.params.id;

  console.log('chatRoomId', chatRoomId);

  return (
    <>
      ChatRoomTemplate :{chatRoomId}
    </>
  )
};

export default ChatRoomTemplate;
