import gql from 'graphql-tag';

/**
 * 유저 생성
 */
const CREATE_USER_MUTATION = gql`
    mutation createUser($userName: String!) {
        createUser(userName: $userName) {
            id
            userName
        }
    }
`;

const EXIT_USER_CHATROOM_MUTATION = gql`
    mutation exotChatRoom($chatRoomId: Int!, $userId: Int!) {
        exitChatRoom(chatRoomId: $chatRoomId, userId: $userId) {
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
`

const JOIN_USER_CHATROOM_MUTATION = gql`
    mutation joinChatRoom($chatRoomId: Int!, $userId: Int!) {
        joinChatRoom(chatRoomId: $chatRoomId, userId: $userId) {
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

/**
 * 채팅룸 생성
 */
const CREATE_CHAT_ROOM_MUTATION = gql`
    mutation createChatRoom ($userId: Int!, $title: String!, $description: String!) {
        createChatRoom(userId: $userId, title: $title, description: $description) {
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

/**
 * 메세지 생성
 */
const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage($chatRoomId: Int!, $userId: Int!, $content: String!) {
        createMessage(chatRoomId: $chatRoomId, userId: $userId, content: $content) {
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
    CREATE_USER_MUTATION,
    CREATE_CHAT_ROOM_MUTATION,
    CREATE_MESSAGE_MUTATION,
    JOIN_USER_CHATROOM_MUTATION,
    EXIT_USER_CHATROOM_MUTATION,
}
