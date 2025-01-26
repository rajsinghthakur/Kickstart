import express from 'express';
import bodyParser from 'body-parser';
import RollRouter from './routes/roll.route.js';
import UserRouter from './routes/user.route.js';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/roll", RollRouter);
app.use("/user", UserRouter)

app.listen(3001, () => {
    console.log("server started.......");
})