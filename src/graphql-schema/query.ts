import gql from 'graphql-tag';
const CHAT_ROOMS_QUERY = gql`    
    query {
        chatRooms {
            id
            title
            description
        }
    }
`;
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

