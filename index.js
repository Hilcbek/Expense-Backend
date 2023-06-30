import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { routerUser } from './router/user.router.js'
import { routerExpense } from './router/expense.router.js'
dotenv.config()
let app = express()
app.use(morgan('common'))
app.use(cookieParser())
app.use(express.json())

app.use(cors({origin: 'https://expense-tracker-mern-app.netlify.app', credentials : true}));
let PORT = process.env.PORT || 6000
let MONGOOSE_URL = process.env.MONGOOSE_URL
mongoose.connect(MONGOOSE_URL).then((connection) => app.listen(PORT, () => console.log('Connected to mongodb'))).catch((err) => console.error(err));
mongoose.connection.on('connected', () => console.log('connected again !'))
mongoose.connection.on('disconnected',() => console.log('disconnected again'))
app.use('/api/auth',routerUser);
app.use('/api/expense',routerExpense);
app.use((err,req,res,next) => {
    let errMessage = err.message;
    let errStatus = err.status;
    res.status(errStatus).json(errMessage);
})
//http://localhost:5173