
import express from 'express';
import { campanias, clientes } from '../controllers/apiController.js';
import protegerRuta from '../middleware/protegerRuta.js';

const router = express.Router();

// Campaigns
router.get('/campanias',
  protegerRuta, 
  campanias
)

// Get Data for consume External API
router.get('/clientes',
  protegerRuta, 
  clientes
)

export default router;