import express from 'express'
import {check} from 'express-validator'
import authMiddleware from './middleware/auth.js'
import security from "./controller/SecurityController.js";
import suspect from "./controller/AddData.js";
import videoController from "./controller/VideoController.js";
import imageController from "./controller/ImageController.js";
import multer from "multer";

const router = express.Router();
//---------------Security
router.post('/registerSecurity', [
    check('email', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12})
], security.registration)
router.post('/loginSecurity', [
    check('email', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").isLength({min: 4, max: 12})
], security.login)
router.get('/GetAllSuspect', authMiddleware, security.GetAllSuspect)
//-----------------Suspect
router.post('/addSuspect', suspect.add)
//--------Video
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-video', upload.single("file"), videoController.uploadVideo);
router.get('/get-video/:id', videoController.getVideo);

router.post('/uploadImage', imageController.uploadImage);
router.get('/getImage/:id', imageController.getImage);

export default router;