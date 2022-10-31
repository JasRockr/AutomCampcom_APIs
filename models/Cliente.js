import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Cliente = db.define('Clientes', {
    identificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    }
});

export default Cliente;