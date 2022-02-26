import express from 'express'
import { getNotifications } from '../controllers/notification'

const api = express.Router();

api.get('/notifications', getNotifications);

export default api