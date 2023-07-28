import React from 'react';
import Link from 'next/link';
import styles from '../styles/Script.module.css';

const ScriptCard = ({ script }) => {
  return (
    <div className={styles.scriptCard}>
      <h3>{script.title}</h3>
      <p>{script.description}</p>
      <Link href={`/scripts/${script.id}`}>
        <a className={styles.viewButton}>View Script</a>
      </Link>
    </div>
  );
};

export default ScriptCard;