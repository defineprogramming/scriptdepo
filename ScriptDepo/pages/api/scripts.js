import { getSession } from 'next-auth/client';
import dbConnect from '../../utils/db';
import Script from '../../models/Script';

dbConnect();

export default async (req, res) => {
  const session = await getSession({ req });

  if (req.method === 'GET') {
    const scripts = await Script.find({});
    res.status(200).json({ success: true, data: scripts });
  } else if (req.method === 'POST') {
    if (!session || !session.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { title, content } = req.body;
    const newScript = new Script({ title, content, user: session.user.id });

    const savedScript = await newScript.save();
    res.status(201).json({ success: true, data: savedScript });
  } else {
    res.status(400).json({ success: false });
  }
};