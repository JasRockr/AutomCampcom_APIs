import Campania from './Campania.js'
import Rol from './Rol.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'
import Cliente from './Cliente.js'

//Categoria.hasOne(Campania) // Relaciones 1:1
Usuario.belongsTo(Rol, { foreignKey: 'rolId' })
Campania.belongsTo(Categoria, { foreignKey: 'categoriaId' })
Campania.belongsTo(Usuario, { foreignKey: 'usuarioId' })
Cliente.belongsTo(Campania, { foreignKey: 'campaniaId' })


export {
    Campania,
    Rol,
    Categoria,
    Usuario,
    Cliente
}