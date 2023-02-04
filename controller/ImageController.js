
import Image from "../models/image.js";
import mongoose from "mongoose";
import path from "path";
import cv from "opencv4nodejs";

class imageController {
    async uploadImage(req, res) {
        console.log("Here");
        const wCap = new cv.VideoCapture(0);
        const frame = wCap.read();
        const bin = cv.imencode(".jpg", frame).toString("base64");
        try {
            //console.log("data:image/jpeg;base64," + image);

            const image = new Image({
                data: new Buffer.from(bin, "binary"),
                contentType: "image/jpeg"
            });
            await image.save((err, image) => {
                if (err) {
                    return res.status(400).json({
                        error: "Failed to save imageController in DB"
                    });
                }
                return res.json("Image was uploaded");

            });
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Upload error"})
        }
    }
    async getImage(req, res) {
        try {
            const image = await Image.findOne({_id: req.params.id});
            if (!image) {
                return res.status(400).json({message: "Image not found"})
            }
            const picture = "data:image/jpeg;base64," + image.data;
            console.log(picture);
            //res.contentType("image/jpeg");
            //return res.send(picture);
            return res.json(picture);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Get image error"})
        }
    }
}
export default new imageController();