import mongoose from 'mongoose';
const {Schema, model} = mongoose;
const SuspectSchema = new Schema({
    region: {type:String, required: true},
    zone:{type:String, required: true},
    kpp: {type:Number, required: true},
    camera: {type:Number, required: true},
    date:  {type:Date, required: true},
    time:  {type:String, required: true},
    dangerous_object: {type:String, required: true},
    status: {type:String, required: true},
})
const Suspect = mongoose.model('Suspect', SuspectSchema);
export default Suspect;
