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

export {
    CHAT_ROOMS_QUERY,
    MESSAGE_QUERY,
};

