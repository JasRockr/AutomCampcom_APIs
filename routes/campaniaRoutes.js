import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar, agregarSql, almacenarSql, editar, guardarCambios, eliminar, mostrarCampania, enviarSms } from '../controllers/campaniaController.js';
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirConsulta.js';


const router = express.Router();

// View campaign Admin GET
router.get('/campanias', 
  protegerRuta, 
  admin
);

// Create campaign GET`
router.get('/campanias/crear', 
  protegerRuta, 
  crear
);

// Create campaign POST
router.post('/campanias/crear', 
  protegerRuta,
  // Validation
  body('campania').notEmpty().withMessage('El nombre de la campaña es obligatorio'),
  body('regla').notEmpty().withMessage('La descripción es requerida para la definición de la campaña').isLength({ max: 200 }).withMessage('La descripción es muy larga'),
  body('categoria').isNumeric().withMessage('Debe seleccionar una categoria'),
  guardar
);

// Add SQL GET
router.get('/campanias/agregar-sql/:id', 
  protegerRuta, 
  agregarSql
);

// Add SQL POST
router.post( '/campanias/agregar-sql/:id', 
  protegerRuta,
  upload.single('consulta'),
  almacenarSql
)

// Edit campaign GET
router.get('/campanias/editar/:id',
    protegerRuta,
    editar
)

// Edit campaign POST
router.post('/campanias/editar/:id', 
  protegerRuta,
  // Validation
  body('campania').notEmpty().withMessage('El nombre de la campaña es obligatorio'),
  body('regla').notEmpty().withMessage('La descripción es requerida para la definición de la campaña').isLength({ max: 200 }).withMessage('La descripción es muy larga'),
  body('categoria').isNumeric().withMessage('Debe seleccionar una categoria'),
  guardarCambios
);

// Delete campaign POST
router.post('/campanias/eliminar/:id', 
    protegerRuta,
    eliminar
)

// View campaign GET
router.get('/campania/:id', 
  protegerRuta,
  mostrarCampania
)

// View campaign POST
router.post('/campania/:id', 
  protegerRuta,
  // Validation
  body('mensaje').notEmpty().withMessage('No se ha definido ningún mensaje para la campaña').isLength({ max: 160 }).withMessage('El mensaje supera los 160 caracteres'),
  body('url').notEmpty().withMessage('Falta el parámetro de URL obligatorio').isURL().withMessage('No parece una URL valida'),
  enviarSms
)


export default router;
