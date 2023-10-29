import UserModel from '../model/User.js';
import PartnerLinkModel from '../model/PartnerLink.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// dotenv.config();

export const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const canditate = await UserModel.findOne({ email });

        if (canditate) {
          return res.status(500).json({ message: 'Email already exists' });
        }

        const user = await UserModel.create({
            email,
            name,
            isAdmin: false,
            isPartner: true,
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
                message: 'Password or email wrong',
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
  

  export const updateData = async (req, res) => {
    try {
      const {id, email, name, password} = req.body;

      const user = await UserModel.findById(id);

      if(!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
      }
      user.email = email;
      user.name = name;


      await user.save();

      res.json(user)

    } catch(error) {
      console.log(e);
      res.status(500).json({
        message: 'Access denied'
      });
    }
  }

  export const getAllUsers = async (req, res) => {
    try {
      const userData = await UserModel.find()
      res.json(userData);
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message: 'Access denied'
      });
    }
  };

  export const createLink = async (req, res) => {
    try {
      const {link, partnerId, promotionalСode} = req.body;
      const data = await PartnerLinkModel.create({
        partnerId,
        link,
        promotionalСode
      })

      res.json(data)
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message: 'Access denied'
      });
    }
  } 

  export const handleLink = async (req, res) => {
    try {
      const { link } = req.query;
      const partnerLink = await PartnerLinkModel.findOne({ link });
      const time = {date: '28.10.2023'}
      if (partnerLink) {
        partnerLink.clicks.push(time)
        await partnerLink.save();
        // res.redirect('https://www.google.com/');
        res.status(200).send('succsses');
      } else {
        res.status(404).send('Link not found');
      }
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message: 'Access denied'
      });
    }
  }

  export const handleBuy = async (req, res) => {
    try {
      const { promotionalСode } = req.body;
      console.log('promotionalСode',promotionalСode);
      const data = await PartnerLinkModel.findOne({ promotionalСode });
      const time = {date: '28.10.2023'}
      if(data) {
        data.buys.push(time)
        await data.save();
        res.status(200).send('succsses');
      } else {
        res.status(404).send('promotional code not found');
      }
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message: 'Access denied'
      });
    }
  }