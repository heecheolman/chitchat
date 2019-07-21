import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const MESSAGE_MUTATION = gql`
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

class Input extends React.Component<any, { chatRoomId: number; userId: number; content: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      chatRoomId: +this.props.chatRoomId,
      userId: +this.props.userId,
      content: ''
    };
  }

  render() {
    return (
      <Mutation mutation={MESSAGE_MUTATION} variables={{
        chatRoomId: this.state.chatRoomId,
        userId: this.state.userId,
        content: this.state.content
      }}>
        {
          (mutation: Function, { loading }: any) => {
            const onChange = (event: any) => {
              this.setState({
                content: event.target.value
              });
            };

            const onClick = (event: any) => {
              mutation();
              this.setState({
                content: ''
              });
            };

            const onKeyPress = (event: any) => {
              if (event.key === 'Enter') {
                mutation();
                this.setState({
                  content: ''
                });
              }
            };

            return (
              <>
                <input type="text"
                       value={this.state.content}
                       placeholder="내용 입력"
                       onChange={onChange}
                       onKeyPress={onKeyPress}
                />
                <button onClick={onClick}>전송</button>
              </>
            )
          }
        }
      </Mutation>
    )
  }
}

export default Input;

// const Input: React.FC<{
//   value: string;
//   onChange: Function;
//   onClick: Function;
//   onKeyPress: Function;
// }> = ({ value, onChange, onClick, onKeyPress }) => {
//   return (
//     <>
//       <input type="text"
//              value={value}
//              placeholder="내용을 입력하세요"
//              onChange={(e) => onChange(e)}
//              onKeyPress={(e) => onKeyPress(e)}
//       />
//       <button onClick={() => onClick()}>전송</button>
//     </>
//   )
// };
//
// export default Input;
