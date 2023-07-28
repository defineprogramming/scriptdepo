import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ScriptCard from '../../components/ScriptCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/Script.module.css';

const Scripts = () => {
  const [scripts, setScripts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await axios.get('/api/scripts');
        setScripts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScripts();
  }, []);

  const handleScriptClick = (id) => {
    router.push(`/scripts/${id}`);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Scripts</h1>
        <div className={styles.grid}>
          {scripts.map((script) => (
            <ScriptCard key={script._id} script={script} onClick={handleScriptClick} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Scripts;