import mongoose from "mongoose";
import * as fs from "fs";
const {Schema, model} = mongoose;
const videoSchema = new Schema({
    video: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
