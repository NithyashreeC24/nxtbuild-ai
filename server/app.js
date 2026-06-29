console.log("APP.JS LOADED");
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import router from './src/routes/index.js';

console.log("ROUTER =", router);
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.get('/test',(req,res)=>{
    res.send("Working");
});
app.use('/api', router);

export default app;