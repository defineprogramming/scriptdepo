import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import LoginForm from '../../components/LoginForm';
import UploadForm from '../../components/UploadForm';

export default function AdminPage() {
  const router = useRouter();
  const [session, loading] = getSession();

  useEffect(() => {
    if (!(session && session.user && session.user.role === 'admin')) {
      router.push('/');
    }
  }, [session, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {!session && <LoginForm />}
      {session && session.user && session.user.role === 'admin' && <UploadForm />}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!(session && session.user && session.user.role === 'admin')) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}