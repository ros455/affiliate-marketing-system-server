import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../model/User.js';

dotenv.config();

export default async function (req, res, next) {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  console.log('token1',token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      console.log('decoded',decoded);
      const user = await UserModel.findById(decoded.id);
      console.log('user',user);
      if (!user || user.disabled) {
        return res.status(403).json({
          message: 'Access denied',
        });
      }

      req.userId = decoded.id;
      req.user = user;
      console.log('modleweare work');
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