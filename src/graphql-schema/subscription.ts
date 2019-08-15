import gql from 'graphql-tag';

const CHAT_ROOM_SUBSCRIPTION = gql`
    subscription {
        chatRoomCreated {
            id
            title
            description
            users {
                id
                userName
            }
        }
    }
`;

const MESSAGE_SUBSCRIPTION = gql`
    subscription messageCreated($chatRoomId: Int!) {
        createdMessage: messageCreated(chatRoomId: $chatRoomId) {
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
    CHAT_ROOM_SUBSCRIPTION,
    MESSAGE_SUBSCRIPTION,
}
