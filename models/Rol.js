import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Rol = db.define('Roles', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

export default Rol;