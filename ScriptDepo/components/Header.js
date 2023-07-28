import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

import styles from '../styles/Header.module.css';

const Header = () => {
  const [session, loading] = useSession();

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>ScriptDepo</a>
      </Link>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link href="/scripts">
              <a>Scripts</a>
            </Link>
          </li>
          {session && (
            <>
              <li>
                <Link href="/admin">
                  <a>Admin</a>
                </Link>
              </li>
              <li>
                <a onClick={() => signOut()}>Logout</a>
              </li>
            </>
          )}
          {!session && (
            <li>
              <Link href="/api/auth/signin">
                <a>Login</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;