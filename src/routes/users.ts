import express from 'express'
import {createUser, getUsers, unlockUser, login} from '../controllers/user'
import { ensureAuth } from '../middlewares/authenticated';

const api = express.Router();

api.post('/users', ensureAuth, createUser);
api.put('/users/unlock', ensureAuth, unlockUser);
api.get('/users', ensureAuth, getUsers);
api.post('/login', login);

export default api