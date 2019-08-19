import React from 'react';
import styles from './ChatHeader.module.scss';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ChatHeader: React.FC<{ prevMeta: any, title?: string; }> = ({ prevMeta, title }) => {
  return (
    <>
      <div className={styles.chatHeader}>
        <div className={styles.buttonBox}>
          {prevMeta.canPrev &&
          <Link to={prevMeta.url}>
            <button className={styles.prevButtonWrap}>
              <FiChevronLeft className={styles.prevButtonIcon} />이전</button>
          </Link>
          }
        </div>
        <div className={styles.titleWrap}>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.buttonBox} />
      </div>
    </>
  );
}

export default ChatHeader;
