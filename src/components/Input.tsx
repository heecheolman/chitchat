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

  onChange = (e: any) => {
    this.setState({
      content: e.target.value
    });
  };

  onClick = (e: any) => {
    this.setState({
      content: '',
    });

  };
  onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this._mutation();
      this.setState({
        content: '',
      });
    }
  };

  render() {
    return (
      <Mutation mutation={MESSAGE_MUTATION} variables={{
        chatRoomId: this.state.chatRoomId,
        userId: this.state.userId,
        content: this.state.content
      }}>
        {
          () => {
            return (
              <>
                <input type="text"
                       value={this.state.content}
                       placeholder="내용 입력"
                       onChange={this.onChange}
                       onKeyPress={this.onKeyPress}
                />
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
