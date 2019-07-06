import React from 'react';

const Input: React.FC<{
  value: string;
  onChange: Function;
  onClick: Function;
  onKeyPress: Function;
}> = ({ value, onChange, onClick, onKeyPress }) => {
  return (
    <>
      <input type="text"
             value={value}
             placeholder="내용을 입력하세요"
             onChange={(e) => onChange(e)}
             onKeyPress={(e) => onKeyPress(e)}
      />
      <button onClick={() => onClick()}>전송</button>
    </>
  )
};

export default Input;
