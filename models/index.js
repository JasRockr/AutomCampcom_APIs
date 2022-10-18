import Campania from './Campania.js'
import Rol from './Rol.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'

//Categoria.hasOne(Campania) // Relaciones 1:1
Usuario.belongsTo(Rol, { foreignKey: 'rolId' })
Campania.belongsTo(Categoria, { foreignKey: 'categoriaId' })
Campania.belongsTo(Usuario, { foreignKey: 'usuarioId' })


export {
    Campania,
    Rol,
    Categoria,
    Usuario
}