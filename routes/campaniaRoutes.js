import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar, agregarSql, almacenarSql, editar } from '../controllers/campaniaController.js';
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirConsulta.js'

const router = express.Router();

router.get('/campanias', protegerRuta, admin);
router.get('/campanias/crear', protegerRuta, crear);
router.post('/campanias/crear', protegerRuta,
  
// Validation
  body('campania').notEmpty().withMessage('El nombre de la campaña es obligatorio'),
  body('regla').notEmpty().withMessage('La descripción es requerida para la definición de la campaña').isLength({ max: 200 }).withMessage('La descripción es muy larga'),
  body('categoria').isNumeric().withMessage('Debe seleccionar una categoria'),
  guardar
);


router.get('/campanias/agregar-sql/:id', 
  protegerRuta, 
  agregarSql
);

router.post( '/campanias/agregar-sql/:id', 
  protegerRuta,
  upload.single('consulta'),
  almacenarSql
)

router.get('/campanias/editar/:id',
    protegerRuta,
    editar
)


export default router;
