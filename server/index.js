import express from 'express';
import cors from 'cors';
import  dbConnection  from './config/database.js';
import  taskRoutes from './routes/taskRoutes.js';
import  categoryRoutes from './routes/categoryRoutes.js';
// import  authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';



dotenv.config();


dbConnection();

const app = express();

app.use(express.json());

app.use(cors());


app.get('/', (req, res) => {
    res.send(` hllo this all api \n
        https://task-manger-five.vercel.app/api/v1/categories

        https://task-manger-five.vercel.app/api/v1/tasks
        

        `);
});

// app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});
