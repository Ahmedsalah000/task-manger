import express from 'express';
import cors from 'cors';
import CustError  from './utils/CustomError.js';
import globalError  from './middlewares/errorMiddleware.js';
import dbConnection from './config/database.js';
import taskRoutes from './routes/taskRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoute.js'
import  authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';



dotenv.config();


dbConnection();

const app = express();
app.use(express.json());

app.use(cors());


app.get('/', (req, res) => {
    res.send(` hello this all api
        <br>
        <a href="https://task-manger-five.vercel.app/api/v1/categories"> https://task-manger-five.vercel.app/api/v1/categories </a>
        <br>
        <a href="https://task-manger-five.vercel.app/api/v1/tasks">https://task-manger-five.vercel.app/api/v1/tasks</a>
        `);
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/users', userRoutes);


app.all('*', (req, res, next) => {
    // 3) Use a generic api error
    next(new CustError(`Can't find this route: ${req.originalUrl}`, 400));
  });
  

  app.use(globalError);

  const PORT = process.env.PORT || 8000;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.green);
  });
