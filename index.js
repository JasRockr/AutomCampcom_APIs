// Import modules
import express from 'express'; // ES Module
//! Deprecated dependencies: csurf
//import csrf from 'csurf'
import cookieParser from 'cookie-parser';
// ------------
import usuarioRoutes from './routes/usuarioRoutes.js';
import campaniaRoutes from './routes/campaniaRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import db from './config/db.js';

// Create app
const app = express();

// Enable form reading
app.use( express.urlencoded({ extended: true }));


// TODO: CSRF protection pending for implementation
// Cookie Parser Enable
app.use( cookieParser() )

//! Deprecated dependencies: csrf from 'csurf'
// CSRF Enable | CSRF: Cross-Site Request Forgery
// app.use( csrf({cookie: true}) )

//! ------------


// DB connection
try {
  await db.authenticate();
  db.sync();
  console.log('Autenticación correcta en la Base de Datos');
} catch (error) {
  console.log(error);
}

// Pug Enable
app.set('view engine', 'pug');
app.set('views', './views');

// Public folder
app.use( express.static('public') );

// Set up routes
app.use('/', appRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', campaniaRoutes);
app.use('/api', apiRoutes);

// Define port number for initialization
const port = process.env.PORT || 3000; // default 3000
app.listen(port, () => {
  console.log(`Servidor activo desde el puerto: ${port}`);
  });