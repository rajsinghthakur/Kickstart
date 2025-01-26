import express from 'express';
import { Add, List, Remove, Search, Update } from '../controller/roll.controller.js';

const router = express.Router();

// localhost:3000/role/add
router.post('/add', Add);

// localhost:3000/role/list
router.get('/list', List);

// localhost:3000/role/search
router.post('/search', Search)

// localhost:3000/role/remove
router.delete('/remove', Remove)

// localhost:3000/role/update
router.put('/update', Update)

export default router;