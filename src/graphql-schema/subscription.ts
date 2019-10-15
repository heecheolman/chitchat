import gql from 'graphql-tag';

/**
 * 채팅 룸 생성되는 부분 pubsub
 */
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

/**
 * 메세지 생성되는 부분 pubsub
 */
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

const CHATROOM_INFO_SUBSCRIPTION = gql`    
    subscription chatRoomInfo($chatRoomId: Int!) {
        chatRoomInfo(chatRoomId: $chatRoomId) {
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
    CHAT_ROOM_SUBSCRIPTION,
    MESSAGE_SUBSCRIPTION,
    CHATROOM_INFO_SUBSCRIPTION,
}
