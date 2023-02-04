
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import router from './router.js'
import multer from 'multer';
import path from "path";
const PORT = process.env.PORT || 6000;

const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());

app.use("/auth", router)

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
mongoose.set('strictQuery', true)

const CONNECTION_URL = 'mongodb+srv://admin:cEW-zhY-WB4-8sf@cluster0.7ugzvf5.mongodb.net/?retryWrites=true&w=majority';
//connect to mongoDB
const start = async () => {
    try{
        await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () =>  console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e);
    }
}
start()
/*

//cEW-zhY-WB4-8sf


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.connect(CONNECTION_URL).then(()=>{console.log('...')})

 */