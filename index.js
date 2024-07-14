import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/router.js';

dotenv.config();

const app = express();
app.use(cors({
    credentials:true,
    origin:['http://localhost:5173']
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',router)


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server  listening on ${port}`);
});
