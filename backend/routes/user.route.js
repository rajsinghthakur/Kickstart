import express from 'express';
import { SignUp, List, SoftDelete, SignIn, Update } from '../controller/user.controller.js';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// localhost:3000/user/signup
router.post('/signup',
    body("email", "Invalid email format").notEmpty().isEmail(),
    body("name", "Name is required and should contain only letters and spaces").notEmpty().matches(/^[A-Za-z ]+$/),
    body("password", "Password must be between 8 to 16 characters").notEmpty().isLength({ min: 8, max: 16 }),
    body("contactNumber", "Contact number must be exactly 10 digits").notEmpty().isNumeric().isLength({ min: 10, max: 10 }),
    body("isDeleted", "isDeleted must be either 0 or 1").notEmpty().isIn([0, 1]),
    body("rollId", "rollId is required and must be a number").notEmpty().isNumeric(),
    SignUp
);

// localhost:3000/user/signin
router.post('/signin',
    body("email", "Invalid email format").notEmpty().isEmail(),
    body("password", "Password must be between 8 to 16 characters").notEmpty().isLength({ min: 8, max: 16 }),
    SignIn);

// localhost:3000/user/list
router.get('/list', List)

// localhost:3000/user/remove
router.delete('/remove',
    body("id", "id is required and must be a number").notEmpty().isNumeric(),
    verifyToken,
    SoftDelete)

// localhost:3000/user/update
router.put('/update',
    body("email", "Invalid email format").notEmpty().isEmail(),
    body("name", "Name is required and should contain only letters and spaces").notEmpty().matches(/^[A-Za-z ]+$/),
    body("password", "Password must be between 8 to 16 characters").notEmpty().isLength({ min: 8, max: 16 }),
    body("contactNumber", "Contact number must be exactly 10 digits").notEmpty().isNumeric().isLength({ min: 10, max: 10 }),
    body("isDeleted", "isDeleted must be either 0 or 1").notEmpty().isIn([0, 1]),
    body("rollId", "rollId is required and must be a number").notEmpty().isNumeric(),
    body("id", "id is required and must be a number").notEmpty().isNumeric(),
    verifyToken,
    Update)

export default router;