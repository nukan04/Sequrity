

import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Security from "../models/security.js";
import Suspect from "../models/suspectObjects.js";

class AddData {
    async add(req, res){
        try {
            const {region, zone, kpp, camera, date, time, dangerous_object, status} = req.body;
            const suspect = new Suspect({region, zone, kpp, camera, date, time, dangerous_object, status});
            await suspect.save();
            return res.json({message: "Suspect was added"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Adding error(Suspect)"})
        }
    }


}

export default new AddData();