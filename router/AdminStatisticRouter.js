import { Router } from "express";
import * as AdminStatisticController from '../controller/AdminStatisticController.js';
import checkAdmin from "../utils/checkAdmin.js";
import multer from 'multer';
import fs from "fs"

const router = new Router();

const storageBig = multer.diskStorage({
    destination: (_,__,cd) => {
        if(!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cd(null,'uploads')
    },
    filename: (_,file,cd) => {
        cd(null, file.originalname)
    },
})

const storageMiddle = multer.diskStorage({
    destination: (_,__,cd) => {
        if(!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cd(null,'uploads')
    },
    filename: (_,file,cd) => {
        cd(null, file.originalname)
    },
})

const storageSmall = multer.diskStorage({
    destination: (_,__,cd) => {
        if(!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cd(null,'uploads')
    },
    filename: (_,file,cd) => {
        cd(null, file.originalname)
    },
})

const uploadBig = multer({storageBig})
const uploadMiddle = multer({storageMiddle})
const uploadSmall = multer({storageSmall})

router.post('/create-admin-statistic',AdminStatisticController.createAdminStatistic);
router.get('/get-admin-statistic',checkAdmin,AdminStatisticController.getAdminStatistic);
router.post('/create-image-storage',AdminStatisticController.createImageStorage);
router.post('/upload-big-baner',uploadBig.single('BigBanner'),AdminStatisticController.UploadBigBaner);
router.post('/upload-middle-baner',uploadMiddle.single('MiddleBanner'),AdminStatisticController.UploadMiddleBaner);
router.post('/upload-small-baner',uploadSmall.single('SmallBanner'),AdminStatisticController.UploadSmallBaner);

export default router;