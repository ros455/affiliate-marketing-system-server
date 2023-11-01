import UserModel from '../model/User.js';
import PartnerStatistic from '../model/PartnerStatistic.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import moment from 'moment-timezone';
const kyivTime = moment().tz('Europe/Kiev');
const formattedDate = kyivTime.format('DD.MM.YYYY');

// export const createPartnerStatistic = async (id) => {
//   try {
//     await PartnerStatistic.create({
//       partnerId: id,
//       event: [
//         {
//           date: '31.10.2023',
//             clicks: [],
//             buys: [],
//         }
//     ],
//     })

//   } catch(error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Access denied'
//     });
//   }
// } 

export const createPartnerStatistic = async (userId) => {
  try {
    console.log('createPartnerStatistic');
    const statistics = await PartnerStatistic.create({
      partnerId: userId,
      event: [
        {
          date: formattedDate,
          clicks: [],
          buys: [],
        }
      ],
    });
    return statistics;
  } catch(error) {
    console.error('Помилка при створенні статистики:', error);
  }
}


export const register = async (req, res) => {
    try {
      console.log('register');
        const { email, name, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const canditate = await UserModel.findOne({ email });

        if (canditate) {
          return res.status(500).json({ message: 'Email already exists' });
        }
        const link = 'random';
        const promotionalСode = 'random';

        const user = await UserModel.create({
            email,
            name,
            link,
            promotionalСode,
            isAdmin: false,
            isPartner: true,
            disabled: false,
            password: hash,
        });

        const statistics = await createPartnerStatistic(user._id);
        user.statistics = statistics._id;
        await user.save();

        // if(user) {
        //   createPartnerStatistic(user._id)
        // }

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
      const user = await UserModel.findById(req.userId)
      .populate('statistics');
  
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

  // export const getAllUsers = async (req, res) => {
  //   try {
  //     const userData = await UserModel.find()
  //     res.json(userData);
  //   } catch(error) {
  //     console.log(error);
  //     res.status(500).json({
  //       message: 'Access denied'
  //     });
  //   }
  // };

  export const getAllUsers = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
  
      const skip = (page - 1) * limit;
      const userData = await UserModel.find().skip(skip).limit(limit);

      console.log('userData',userData);
      res.json(userData.slice(1));
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Access denied'
      });
    }
  };

  export const searchUsers = async (req, res) => {
    try {
      const { page = 1, limit = 2, search = '' } = req.query;
  
      const skip = (page - 1) * limit;
      const query = search ? { name: new RegExp(search, 'i') } : {};
      const users = await UserModel.find(query).skip(skip).limit(limit)
      .populate('statistics')
  
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  };