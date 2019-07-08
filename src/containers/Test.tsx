import React from 'react';

class Test extends React.Component {
  inputChange = () => {
    console.log('inputChange');
  };

  constructor(props: any) {
    super(props);
    console.log('constructor!!!!!!!!!!!!!');
  }

  render() {
    return (
      <input type="text" onChange={this.inputChange} />
    )
  }
}

export default Test;
