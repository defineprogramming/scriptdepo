import { getSession } from 'next-auth/client';

export async function requireAuth(req, res, next) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }

  req.user = session.user;
  next();
}

export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).send('Forbidden');
    return;
  }

  next();
}