import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const SecuritySchema = new Schema({
    email: {type:String, unique: true, required: true},
    password: {type:String, required: true}
})
const Security = mongoose.model('Security', SecuritySchema);
export default Security;