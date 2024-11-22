import express from 'express';
import apiRouter from './routes/apiRouter.js'
import connectDB from './config/dbConfig.js';

const app = express();

app.use(express.json());
app.use('/api',apiRouter);

app.get('/ping',(req,res)=>{
    res.json({
        ping:'pong',
        server:'live'
    })
});

app.listen(3001, ()=> {
    console.log("server is running");
    connectDB();
})