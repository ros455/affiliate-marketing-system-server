import UserModel from '../model/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// dotenv.config();

export const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            email,
            name,
            isAdmin: false,
            disabled: false,
            password: hash,
        });

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, { expiresIn: '30d' });

        const { password: hashedPassword, ...userData } = user.toObject();
        
        res.json({ ...userData, token });

    } catch (error) {
        console.error('Помилка реєстрації користувача:', error);
        res.status(500).json({ message: 'Не вдалося зареєструвати користувача' });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        console.log('WORK');
        if(!user) {
          console.log('uSER');
            return res.status(404).json({
                message: 'User not found',
            })
        }

        if(user.disabled) {
          console.log('disabled',user.disabled);
          return res.status(404).json({
              message: 'User disabled',
          })
      }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

        if(!isValidPass) {
          console.log('PASSWORD');
            return res.status(400).json({
                message: 'Password not found',
            })
        }

        const token = jwt.sign(
          { id: user._id},
          process.env.TOKEN_KEY,
          { expiresIn: '30d' }
        );

        const {passwordDoc, ...userData} = user._doc

        await user.save();

        res.json({...userData, token})
    } catch(e) {
        console.log(e);
    }
}

export const getMe = async (req, res) => {
    try {
      const user = await UserModel.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
  
      const { password, ...userData } = user._doc;
      res.json(userData);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'Access denied'
      });
    }
  }
  