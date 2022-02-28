import express from 'express'
import { getIndexPriceQuotes } from '../controllers/indexPriceQuotes'
import { ensureAuth } from '../middlewares/authenticated';

const api = express.Router();

api.get('/indexPriceQuotes', ensureAuth, getIndexPriceQuotes);

export default api