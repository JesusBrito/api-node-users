import express from 'express'
import { getNotifications } from '../controllers/notification'
import { ensureAuth } from '../middlewares/authenticated';

const api = express.Router();

api.get('/notifications', ensureAuth, getNotifications);

export default api