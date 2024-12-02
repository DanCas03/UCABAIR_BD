import { pool } from './Postgres_connection.js';

const tabla = 'tb_experiencia'; // Nombre de la tabla que estoy usando... para hacer la prueba

const getPrueba = async () => {
    try { 
        pool.query('SELECT * FROM '+ tabla, (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results.rows);
        });
    } catch (error) {
        console.error(error);
    }
};

getPrueba();