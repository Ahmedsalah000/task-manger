import express from 'express';
import cors from 'cors';
import  dbConnection  from './config/database.js';
import dotenv from 'dotenv'



dotenv.config();


dbConnection();

const app = express();

app.use(express.json());

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});
