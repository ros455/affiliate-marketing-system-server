import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../model/User.js';

dotenv.config();

export default async function (req, res, next) {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);

      const user = await UserModel.findById(decoded.id);
      if (!user || !user.isAdmin) {
        return res.status(403).json({
          message: 'Access denied',
        });
      }

      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Access denied',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Access denied',
    });
  }
}