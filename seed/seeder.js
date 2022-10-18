import { exit } from 'node:process';
import categorias from './categorias.js';
import usuarios from './usuarios.js';
import roles from './roles.js';
import db from '../config/db.js';
import { Categoria, Usuario, Rol } from '../models/index.js';

const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate()

        // Generar columnas
        await db.sync()

        // Insertar data
        await Promise.all ([
            Categoria.bulkCreate(categorias),
            Usuario.bulkCreate(usuarios),
            Rol.bulkCreate(roles)
        ])

        console.log('Datos importados correctamente')
        exit() // Exit sin parametros para indicar que salió sin errores

    } catch (error) {
        console.log(error),
        exit(1) // Exit con parametros (1) para indicar que salió cin errores
    }
}

const eliminarDatos = async () => {
    try {
        /* -- Opcion #1 para eliminar todos los datos de BD */
        await db.sync( {force: true} )

        /* -- Opcion #2 para eliminar datos con truncate por cada modelo */
        // await Promise.all ([
        //     Categoria.destroy({ where: {}, truncate: true }),
        //     Precio.destroy({ where: {}, truncate: true })
        // ])

        console.log('Datos eliminados correctamente')
        exit() // Exit sin parametros para indicar que salió sin errores
    } catch (error) {
        console.log(error),
        exit(1) // Exit con parametros (1) para indicar que salió cin errores
    }
}

if( process.argv[2] === "-i" ) {
    importarDatos();
}

if( process.argv[2] === "-e" ) {
    eliminarDatos();
}