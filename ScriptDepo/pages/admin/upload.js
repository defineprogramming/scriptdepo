import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import UploadForm from '../../components/UploadForm';
import { uploadScript } from '../../utils/api';

export default function Upload() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [message, setMessage] = useState('');

  if (loading) return null;

  if (!loading && !session) {
    router.push('/api/auth/signin');
    return null;
  }

  const handleUpload = async (script) => {
    try {
      const response = await uploadScript(script);
      if (response.status === 200) {
        setMessage('Script uploaded successfully!');
      } else {
        setMessage('Failed to upload script. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Upload Script</h1>
      <UploadForm onUpload={handleUpload} />
      {message && <p>{message}</p>}
    </div>
  );
}