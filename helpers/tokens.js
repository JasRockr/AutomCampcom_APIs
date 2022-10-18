import jwt from 'jsonwebtoken'

// Set up JWT
const generarJWT = datos => jwt.sign({ 
  id : datos.id, 
  nombre: datos.nombre, 
  app: datos.app 
}, process.env.JWT_SECRET, { 
  expiresIn: '1d' 
})

// Create confirmation id
const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32);

export {
    generarJWT,
    generarId
}