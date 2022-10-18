// Import modules
import express from 'express';
import { formularioLogin, autenticar, formularioRegisto, registrar, confirmar, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword } from '../controllers/usuarioController.js'

const router = express.Router();

// Endpoints for routes
router.get('/login', formularioLogin);
router.post('/login', autenticar);

router.get('/registro', formularioRegisto);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);

// Save new Password
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

// Export
export default router;