
import express from 'express';
import { campanias, clientes, sms } from '../controllers/apiController.js';
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

// POST External API
router.post('/campanias/sms/:id', 
  protegerRuta,
  sms
  // Validation
  /*
  body('campania').notEmpty().withMessage('El nombre de la campaña es obligatorio'),
  body('regla').notEmpty().withMessage('La descripción es requerida para la definición de la campaña').isLength({ max: 200 }).withMessage('La descripción es muy larga'),
  body('categoria').isNumeric().withMessage('Debe seleccionar una categoria'),
  guardar
  */
);


export default router;