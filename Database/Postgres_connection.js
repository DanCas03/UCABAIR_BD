import pg from 'pg';

const usuario = 'Soporte'; // Usuario de la base de datos, cambiar por el usuario que tengan
const contrasena = 'soporte'; // Contraseña del usuario de la base de datos, cambiar por la contraseña que tengan

export const pool = new pg.Pool({
    user: usuario,
    host: 'localhost',
    database: 'Prueba', // Nombre de la base de datos, yo tengo una que se llama prueba
    password: contrasena,
    port: 5432
});