
import Video from "../models/video.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import express from "express";
import cv from "opencv4nodejs";

class videoController {
    async uploadVideo(req, res) {


        try {
            fs.writeFileSync("video1.mp4", req.file.buffer);

            const video = new cv.VideoCapture("video1.mp4");
            const photos = [];
            //photos[frameCount] = "data:image/jpeg;base64," + cv.imencode(".jpg", grabbed).toString("base64");
            const totalFrames = video.get(cv.CAP_PROP_FRAME_COUNT);

            const frameSkip = 3 * video.get(cv.CAP_PROP_FPS);
            console.log(totalFrames, " ", frameSkip);
            let frameCount = 0;
            for (let i = 0; i < totalFrames; i += frameSkip) {
                video.set(cv.CAP_PROP_POS_FRAMES, i);
                const grabbed = video.read();
                if (!grabbed) {
                    break;
                }
                console.log("frame: ", i);
                photos[frameCount] = "data:image/jpeg;base64," + cv.imencode(".jpg", grabbed).toString("base64");
                frameCount++;
                console.log(photos[i], "\n");
                //cv.imwrite(`frame-${i}.jpg`, grabbed);
            }

            video.release();
            fs.unlinkSync("video1.mp4");
            return res.send(photos[1]);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Upload error"})
        }
    }
    // async uploadVideo(req, res) {
    //     try {
    //         console.log(req.file);
    //         const video = new Video({
    //             video: new Buffer.from(req.file.buffer, "binary"),
    //             contentType: req.file.mimetype
    //         });
    //         video.save((err, video) => {
    //             if (err) {
    //                 return res.status(400).json({
    //                     error: "Failed to save videoController in DB"
    //                 });
    //             }
    //             res.json({ video });
    //         });
    //         /*
    //         const videoController = new Video({videoController: req.file.buffer, contentType: req.file.mimetype});
    //         await videoController.save();
    //         return res.json({message: "Video was uploaded"});*/
    //     } catch (e) {
    //         console.log(e);
    //         res.status(400).json({message: "Upload error"})
    //     }
    // }
    async getVideo(req, res) {
        try {

            const video = await Video.findOne({_id: req.params.id});
            if (!video) {
                return res.status(400).json({message: "Video not found"})
            }
            // give me videoController
            //
            res.contentType("videoController/mp4");
            return res.sendFile(path.join(__dirname, "WebCam.html"), video.data);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Get videoController error"})
        }
    }




}
export default new videoController();