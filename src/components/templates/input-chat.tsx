import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { useMutation } from 'react-apollo-hooks';

interface IState {
  writer: string;
  description: string;
}

const write = gql`
  mutation write($writer: String!, $description: String!) {
    write(writer: $writer, description: $description)
  }
`;

const InputChat = () => {
  const [writer, setWriter]: any = useState('');
  useEffect(() => {
    const writer = prompt('Name');
    setWriter(writer);
  }, []);
  const [description, setDescription] = useState('');
  const mutation = useMutation(write, {
    variables: {
      writer,
      description
    }
  });
  return (
    <div>
      <input type="text"
             value={description}
             placeholder="할말 입력"
             onChange={e => {
               setDescription(e.target.value);
             }}
             onKeyPress={e => {
               if(e.key === 'Enter') {
                 setDescription('');
                 mutation();
               }
             }}
      />
      <button onClick={() => {
        setDescription('');
        mutation();
      }}>확인</button>
    </div>
  );
};
export default InputChat;

// export class InputChat extends React.Component {
//   state: IState;
//
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       writer: '',
//       description: ''
//     };
//   }
//
//   setWriter(value: string) {
//     this.setState({
//       writer: value,
//     })
//   }
//
//   setDescription(value: string) {
//     this.setState({
//       description: value
//     })
//   }
//
//   sendMessage() {
//     this.setDescription('');
//   }
//
//   render() {
//     return (
//       <Mutation mutation={write} variables={{ writer: this.state.writer, description: this.state.description }}>
//         { (writeMutation: any) => {
//           return (
//             <div>
//               <input type="text"
//                      value={this.state.description}
//                      placeholder="할 말을 적어주세요"
//                      onChange={e => this.setDescription(e.target.value)}
//                      onKeyPress={e => {
//                        if (e.key === 'Enter') {
//                          this.sendMessage();
//                        }
//                      }}
//               />
//               <button onClick={() => this.sendMessage()}>전송</button>
//             </div>
//           )
//         } }
//       </Mutation>
//     )
//   }
// }
