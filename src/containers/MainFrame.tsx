import React from 'react';
import styles from './MainFrame.module.scss';
import { Link } from 'react-router-dom';

const MainFrame: React.FC = () => (
  <div className={styles['main-frame']}>
    닉네임 설정: <input type="text"/>
    <Link to="/chat-list"><button>확인</button></Link>
  </div>
);

export default MainFrame;
