import express from 'express';
import db from './db.js';
import cors from 'cors';
import router from './routes/weather.js';

const app = express();

db();
app.use(express.json());
app.use(cors());
app.use("/",router);
app.listen(5000,()=>{
    console.log("server is running on port 5000");
});
