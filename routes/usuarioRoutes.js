// Import modules
import express from 'express';
import { formularioLogin, autenticar, cerrarSesion, formularioRegisto, registrar, confirmar, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword } from '../controllers/usuarioController.js';
import protegerRuta from '../middleware/protegerRuta.js';

const router = express.Router();

// Endpoints for routes

// Login
router.get('/login', 
  formularioLogin
);

router.post('/login', 
  autenticar
);

// Close session
router.post('/cerrar-sesion', 
  cerrarSesion
);

// Register
router.get('/registro', 
  protegerRuta,
  formularioRegisto
);

router.post('/registro', 
  protegerRuta,
  registrar
);

// Confirm registration
router.get('/confirmar/:token', 
  confirmar
);

// Forget password
router.get('/olvide-password', 
  formularioOlvidePassword
);

router.post('/olvide-password', 
  resetPassword
);

// Save new Password
router.get('/olvide-password/:token', 
  comprobarToken
);

router.post('/olvide-password/:token', 
  nuevoPassword
);

// Export
export default router;