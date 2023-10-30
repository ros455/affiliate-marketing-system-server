import PartnerStatistic from '../model/PartnerStatistic.js';

export const createPartnerStatistic = async (req, res) => {
    try {
      const {link, partnerId, promotionalСode} = req.body;
      const data = await PartnerStatistic.create({
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
      const partnerLink = await PartnerStatistic.findOne({ link });
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
      const data = await PartnerStatistic.findOne({ promotionalСode });
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