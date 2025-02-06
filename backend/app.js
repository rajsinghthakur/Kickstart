import express from 'express';
import cors from 'cors';
import RollRouter from './routes/roll.route.js';
import UserRouter from './routes/user.route.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration (Optional: Adjust as needed)
app.use(cors({
    origin: '*', // Allowed origins, modify this in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use("/roll", RollRouter);
app.use("/user", UserRouter);

// Start Server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});
