import PaymentRequestModel from "../model/PaymentRequest.js";
import UserModel from '../model/User.js';
import moment from "moment-timezone";
const kyivTime = moment().tz("Europe/Kiev");
const formattedDateTime = kyivTime.format("DD.MM.YYYY");

export const createPaymantItem = async (req,res) => {
    try {
        const {sum, comment, wallet, method, partnerId} = req.body;
        const data = await PaymentRequestModel.create({
            sum,
            comment,
            wallet,
            method,
            date: formattedDateTime,
            status: 'New',
            partner: partnerId
        })

        if(!data) {
            return res.status(500).json({
                message: 'Access denied'
              });
        }

        res.json(data)
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Access denied'
          });
    }
}

export const getAllPaymantItem = async (req,res) => {
    try {
        const { page, limit } = req.query;
    
        // page = Math.max(Number(page) || 1, 1);
        // limit = Math.max(Number(limit) || 10, 1);

        let skip = (page - 1) * limit;

        if (skip < 0) skip = 0;

        const data = await PaymentRequestModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('partner');

        if(!data) {
            return res.status(404).json({
                message: 'Not found'
              });
        }

        res.json(data);
    } catch(error) {
        console.log(error);
        res.status(404).json({
          message: 'Not found'
        });
    }
}

export const getAllPaymantItemForUser = async (req,res) => {
    try {
        const { page, limit, userId } = req.query;
        let skip = (page - 1) * limit;

        // Перевірка на випадок, якщо skip вийшов від'ємним
        if (skip < 0) skip = 0;

        console.log('work');

        const data = await PaymentRequestModel.find({partner: userId})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('partner');

        if(!data) {
            return res.status(404).json({
                message: 'Not found'
              });
        }

        res.json(data);
    } catch(error) {
        console.log(error);
        res.status(404).json({
          message: 'Not found'
        });
    }
}

export const aproveRequest = async (req,res) => { 
    try {
        const {requestId, userId, sum} = req.body;
        const request = await PaymentRequestModel.findById(requestId);
        const user = await UserModel.findById(userId);
        if(!request) {
            res.status(404).json({
                message: 'Not found'
              });
        }
        if(!user) {
            res.status(404).json({
                message: 'Not found'
              });
        }

        const newBalance = user.balance - sum;

        if(newBalance < 0) {
            newBalance = 0
        }

        user.balance = newBalance;

        request.status = 'Successfully';

        request.save();
        user.save();

        res.json(request)
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Access denied'
          });
    }
}

export const cancelledRequest = async (req,res) => {
    try {
        const {requestId} = req.body;
        const request = await PaymentRequestModel.findById(requestId);
        if(!request) {
            res.status(404).json({
                message: 'Not found'
              });
        }

        request.status = 'Cancelled'

        request.save();

        res.json(request)
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Access denied'
          });
    }
}