
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new Schema({
    data: Buffer,
    contentType: String
});

const Image = mongoose.model('Image', imageSchema);

export default Image;


