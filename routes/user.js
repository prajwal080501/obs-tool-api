import {update, remove, getUser} from '../controllers/user.js'
import express from 'express'
import { verifyToken } from '../helpers/verifyToken.js';


const router = express.Router();

router.put('/:id', verifyToken, update);

router.delete('/:id', verifyToken, remove);

router.get('/find/:id', verifyToken, getUser);

export default router;
