

import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Security from "../models/security.js";
import Suspect from "../models/suspectObjects.js";
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: "5h"})
}
class SecurityController {
    async registration(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request in registration", errors})
            }
            const {email, password} = req.body;
            const candidate = await Security.findOne({email});
            if (candidate) {
                return res.status(400).json({message: "Security already exist"})
            }
            var hash = bcrypt.hashSync(password, 4);
            const security = new Security({email, password: hash});
            await security.save();
            return res.json({message: "Security was created"});
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Registration error(Security)"})
        }
    }
    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request in login", errors})
            }
            const {email, password} = req.body;
            const security = await Security.findOne({email});
            if(!security){
                return res.status(400).json({message: "Incorrect data"})
            }
            const validPassword = bcrypt.compareSync(password, security.password);
            if (!validPassword) {
                return res.status(400).json({message: "Incorrect data"})
            }
            const token = generateAccessToken(security._id, "security");
            return res.json(token);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Login error(security)"})
        }
    }
    async GetAllSuspect(req, res) {
        try {
            const suspects = await Suspect.find();
            return res.json(suspects)
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "GetAllSuspect error"})
        }
    }
    /*
    async DeleteEvent(req, res) {
        try{
            const {event_id} = req.body;
            const event = await Event.findById(event_id);
            if(!Event){
                return res.status(400).json({message: "Event not found"})
            }
            const organization = await Organization.findById(event.organization_id);
            if(!organization){
                return res.status(400).json({message: "Organization not found"})
            }
            organization.events_id.pull(event_id)
            await organization.save();
            console.log(organization);
            const volontaires = await Volontaire.find({_id: event.participants_id});
            volontaires.forEach(async (volontaire) => {
                volontaire.events_id.pull(event_id);
                await volontaire.save();
                console.log(volontaire);
            })
            await Event.deleteOne({_id: event_id});
            res.json({message: "Event was deleted"})
        }catch (e) {
            console.log(e);
            res.status(400).json({message: "DeleteEventError"})
        }
    }
    */
}

export default new SecurityController();