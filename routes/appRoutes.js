import express from 'express';
import {inicio, categoria, noEncontrado, buscador} from '../controllers/appController.js';
import protegerRuta from '../middleware/protegerRuta.js';

const router = express.Router()

// Start page
router.get('/',
  protegerRuta, 
  inicio
)

// Categories
router.get('/categorias/:id', 
  protegerRuta, 
  categoria
)

// Page 404
router.get('/404', 
  noEncontrado
)

// Search
router.post('/buscador',
  protegerRuta, 
  buscador
)

export default router;