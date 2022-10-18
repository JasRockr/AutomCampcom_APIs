import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Campania = db.define('Campanias', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    campania: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    regla: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    consulta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

export default Campania;