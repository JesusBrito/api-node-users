import express from 'express'
import {createUser, getUsers, login} from '../controllers/user'

const api = express.Router();

api.post('/users', createUser);
api.get('/users', getUsers);
api.post('/login', login);

export default api