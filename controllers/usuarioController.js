// Import models
import { body, check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { generarJWT, generarId } from '../helpers/tokens.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';

// Form login
const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Iniciar Sesión'
    //! csrfToken: req.csrfToken()
  })
}

// Authenticated login
const autenticar = async (req, res) => {
  // Validación
  await check('email').isEmail().withMessage('No parece un email correcto').run(req)
  await check('password').notEmpty().withMessage('El Password es obligatorio').run(req)

  let resultado = validationResult(req)
  //return res.json(resultado.array())

  // Validar que el array de resultado esté vacío
  if(!resultado.isEmpty()) {
      // Errores
      return res.render('auth/login', {
          pagina: 'Iniciar Sesión',
          //! csrfToken: req.csrfToken(),
          errores: resultado.array()
      })
  }

  const { email, password } = req.body
  
  // Comprobar que el usuario existe
  const usuario = await Usuario.findOne({ where : { email } })
  if(!usuario) {
      // Errores
      return res.render('auth/login', {
          pagina: 'Iniciar Sesión',
          //! csrfToken: req.csrfToken(),
          errores: [{msg: 'El usuario no existe'}]
      })
  }

  // Comprobar que el usuario está confirmado
  if(!usuario.confirmado) {
      // Errores
      return res.render('auth/login', {
          pagina: 'Iniciar Sesión',
          //! csrfToken: req.csrfToken(),
          errores: [{msg: 'Tu Cuenta no ha sido confirmada'}]
      })
  }

  // Comprobar que el password es correcto
  if(!usuario.verificarPassword(password)) {
      // Errores
      return res.render('auth/login', {
        pagina: 'Iniciar Sesión',
        //! csrfToken: req.csrfToken(),
        errores: [{msg: 'EL Password es incorrecto'}]
      })
  }

  // Autenticar el usuario
  const token = generarJWT({
    id: usuario.id, 
    nombre: usuario.nombre, 
    app: process.env.PROJECT_NAME
  })

  console.log(token)
  //Almacenar JWT en un Cookie
  return res.cookie('_token', token, {
      httpOnly: true,
      //expires: 9000 // 9000 ms
      //secure: true,
      //sameSite: true
  }).redirect('/campanias');
}

// Form Registration
const formularioRegisto = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Crear Cuenta'
  })
}

const registrar = async (req, res) => {
  // Validation
  await check('nombre').notEmpty().withMessage('El nombre no debe estar vacío').run(req)
  await check('email').isEmail().withMessage('No parece un email correcto').run(req)
  await check('password').isLength({ min: 6 }).withMessage('El Password debe ser al menos de 6 caracteres').run(req)
  await check('repetir_password').equals(req.body.password).withMessage('Los Password deben ser iguales').run(req)

  let resultado = validationResult(req)
  //return res.json(resultado.array())

  // Validate that array is empty
  if(!resultado.isEmpty()) {
      // Errors
      return res.render('auth/registro', {
          pagina: 'Crear Cuenta',
          //! csrfToken: req.csrfToken(),
          errores: resultado.array(),
          usuario: {
              nombre: req.body.nombre,
              email: req.body.email
          }
      })
  }

  // Extract data
  const { nombre, email, password } = req.body

  // Validate that user don't registered in the database
  const existeUsuario = await Usuario.findOne({ where : { email } })
  if(existeUsuario) {
      return res.render('auth/registro', {
          pagina: 'Crear Cuenta',
          //! csrfToken: req.csrfToken(),
          errores: [{msg: 'El usuario ya se encuentra registrado'}],
          usuario: {
              nombre: req.body.nombre,
              email: req.body.email
          }
      })
  }

  // Save user information
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId()
  });

  // Send confirmation email
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token
  });

  // Show confirmation message
  res.render('templates/mensaje', {
    pagina: 'Cuenta Creada Correctamente',
    mensaje: 'Se ha enviado un Email de Confirmación, ahora puede hacer click en el enlace'
  });
}

// Account verification
const confirmar = async (req, res, next) => {
  const { token } = req.params;
  
  // Validate token
  const usuario = await Usuario.findOne({ where : {token} })
  if(!usuario) {
      return res.render('auth/confirmar-cuenta', {
          pagina: 'Error al confirmar la cuenta',
          mensaje: 'Es posible que esta cuenta ya se haya confirmado, intenta nuevamente',
          error: true
      })
  }

  // Confirm email
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render('auth/confirmar-cuenta', {
  pagina: 'Cuenta Confirmada',
  mensaje: 'La Cuenta se confirmó correctamente'
  })

}

// Form Password recovery
const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    pagina: 'Recupera tu acceso'
  })
}

// Function reset password
const resetPassword = async (req, res) => {
  // Validación
  await check('email').isEmail().withMessage('No parece un email correcto').run(req)

  let resultado = validationResult(req)

  // Validar que el array de resultado esté vacío
  if(!resultado.isEmpty()) {
    // Errores
    return res.render('auth/olvide-password', {
      pagina: 'Recupera tu acceso',
      //! csrfToken: req.csrfToken(),
      errores: resultado.array()
    })
  }

  // Buscar el usuario
  const { email } = req.body
  const usuario = await Usuario.findOne({ where : {email} })
  // Si el usuario no existe
  if(!usuario) {
      // Errores
      return res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso',
        //! csrfToken: req.csrfToken(),
        errores: [{msg: 'El Email no está asociado a ningún usuario'}]
      })
  }

  // Si el usuario existe, se genera un token y se envía el email
  usuario.token = generarId();
  await usuario.save();

  //Envío de email
  emailOlvidePassword({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token
  });

  // Renderizar mensaje de confirmación
  res.render('templates/mensaje', {
      pagina: 'Restablece tu Password',
      mensaje: 'Hemos Enviado un Email con las instrucciones'
  })
}

const comprobarToken = async (req, res, next) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne( {where : {token}} )
  
  if(!usuario) {
      return res.render('auth/confirmar-cuenta', {
          pagina: 'Restablece tu Password',
          mensaje: 'Hubo un error al validar tu información, intenta de nuevo',
          error: true
      })
  }

  // Mostrar formulario para modificar el password
  res.render('auth/reset-password', {
      pagina: 'Reestablece tu Password',
      //! csrfToken: req.csrfToken()
  })

}

const nuevoPassword = async (req, res) => {
  // Validar nuevo Password
  await check('password').isLength({ min: 6 }).withMessage('El Password debe ser al menos de 6 caracteres').run(req)

  let resultado = validationResult(req)

  // Validar que el array de resultado esté vacío
  if(!resultado.isEmpty()) {
      // Errores
      return res.render('auth/reset-password', {
          pagina: 'Reestablece tu Password',
          //! csrfToken: req.csrfToken(),
          errores: resultado.array()
      })
  }

  const { token } = req.params
  const { password } = req.body;

  // Identificar el cambio
  const usuario = await Usuario.findOne({ where : {token} })

  // Hash de nuevo Password
  const salt = await bcrypt.genSalt(10)
  usuario.password = await bcrypt.hash( password, salt );
  usuario.token = null;

  await usuario.save();

  res.render('auth/confirmar-cuenta', {
      pagina: 'Password Reestablecido',
      mensaje: 'El Password se ha guardado correctamente'
  })

}

// Export
export {
  formularioLogin,
  autenticar,
  formularioRegisto,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword,
  comprobarToken,
  nuevoPassword
}