import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Script.module.css';

const ScriptViewer = () => {
  const router = useRouter();
  const { id } = router.query;
  const [script, setScript] = useState('');

  useEffect(() => {
    const fetchScript = async () => {
      try {
        const res = await axios.get(`/api/scripts/${id}`);
        setScript(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchScript();
    }
  }, [id]);

  return (
    <div className={styles.scriptViewer}>
      <h1>{script.title}</h1>
      <pre>{script.content}</pre>
    </div>
  );
};

export default ScriptViewer;