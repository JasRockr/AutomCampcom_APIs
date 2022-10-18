import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'admin',
        email: 'admin@campcom.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    },

    {
        nombre: 'confirmado',
        email: 'confirmado@campcom.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    },

    {
        nombre: 'noconfirmado',
        email: 'noconfirmado@campcom.com',
        confirmado: 0,
        password: bcrypt.hashSync('password', 10)
    }
]

export default usuarios;