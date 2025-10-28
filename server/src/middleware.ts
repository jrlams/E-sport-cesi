import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const providedPassword = req.headers['x-admin-password'];

  if (!adminPassword) {
    return res.status(500).send({ message: 'Admin password is not configured.' });
  }

  if (providedPassword !== adminPassword) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  next();
};
