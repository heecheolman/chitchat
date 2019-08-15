import gql from 'graphql-tag';

const CREATE_USER_MUTATION = gql`
    mutation createUser($userName: String!) {
        createUser(userName: $userName) {
            id
            userName
        }
    }
`;

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
}
