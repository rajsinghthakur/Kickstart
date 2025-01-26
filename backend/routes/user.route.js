import express from 'express';
import { SignUp, List, Remove, SignIn, Update } from '../controller/user.controller.js';

const router = express.Router();

// localhost:3000/user/signup
router.post('/signup', SignUp);

// localhost:3000/user/signin
router.post('/signin', SignIn);

// localhost:3000/user/list
router.get('/list', List)

// localhost:3000/user/remove
router.delete('/remove', Remove)

// localhost:3000/user/update
router.put('/update', Update)

export default router;