import gql from 'graphql-tag';

/**
 * 채팅룸 리스트 가져오기
 */
const CHAT_ROOMS_QUERY = gql`
  query {
    chatRooms {
      id
      title
      description
    }
  }
`;

/**
 * 메세지 리스트 가져오기
 */
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

/**
 * 채팅방 정보 가져오기
 */
const CHATROOM_QUERY = gql`
  query chatRoom($chatRoomId: Int!) {
    chatRoom(id: $chatRoomId) {
      id
      title
      description
      users {
        id
        userName
      }
      messages {
        id
        content
        createdBy {
          id
          userName
        }
        createdAt
      }
    }
  }
`;

export {
  CHAT_ROOMS_QUERY,
  CHATROOM_QUERY,
  MESSAGE_QUERY,
};

