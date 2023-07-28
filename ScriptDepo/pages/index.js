import React from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import ScriptCard from '../components/ScriptCard';
import { getScripts } from '../utils/api';
import styles from '../styles/Home.module.css';

export default function Home({ scripts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ScriptDepo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to ScriptDepo
        </h1>

        <div className={styles.grid}>
          {scripts.map((script) => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const scripts = session ? await getScripts() : [];

  return {
    props: { scripts },
  };
}