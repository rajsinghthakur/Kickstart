import express from 'express';
import { Add, List, Remove, Search, Update } from '../controller/roll.controller.js';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// localhost:3000/role/add
router.post('/add',
    body("roll", "roll must contain only letters").notEmpty().isAlpha(),
    body("isActive", "isActive must be a number (0 or 1)").notEmpty().isNumeric().isIn([0, 1]),
    verifyToken,
    Add
);

// localhost:3000/role/list
router.get('/list', List);

// localhost:3000/role/search
router.post('/search',
    body("id", "Please enter a valid numeric ID").notEmpty().isNumeric(),
    Search
);

// localhost:3000/role/remove
router.delete('/remove',
    body("id", "Please enter a valid numeric ID").notEmpty().isNumeric(),
    verifyToken,
    Remove
);

// localhost:3000/role/update
router.put('/update',
    body("roll", "roll must contain only letters").notEmpty().isAlpha(),
    body("isActive", "isActive must be a number (0 or 1)").notEmpty().isNumeric().isIn([0, 1]),
    body("id", "Please enter a valid numeric ID").notEmpty().isNumeric(),
    verifyToken,
    Update
);

export default router;