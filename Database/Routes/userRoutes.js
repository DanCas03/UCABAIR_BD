import express from "express";
import pg from "pg";
import { pool } from '../Postgres_connection.js';

const tablaUsuario = 'usuario';
const router = express.Router();
//rutas
router.get("/login", async(req, res) => {
    try {
        pool.query(`SELECT usu_nombre, usu_contrasena FROM `+ tablaUsuario+ ` WHERE usu_nombre = '${req.query.user}' `, (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length == 0){
                res.send({message: 'user not found'});
            }else{    if (results.rows[0].usu_contrasena == req.query.password){
                    res.send({message: 'success'});
                } else {
                    res.send({message: 'incorrect password'});
                }}
        });
    } catch (error) {
        console.log(error);
        res.send({message: 'error'})
    }
    });

router.put("/signup", async(req, res) => {
    try {
        const result = await crearUsuario(req.query.user, req.query.password, req.query.email);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({message: 'error'})
    }

});
//funciones

async function buscarFila(tabla,columna, dato) {
    try {
        const result = await pool.query(`SELECT * FROM ${tabla} WHERE ${columna} = '${dato}'`);
        if (result.rows.length == 0){
            return {message :'not found'};
        }else{
            return {fila: result.rows[0], message: 'found'};
        }
    } catch (error) {
        console.log(error);
        return 0;
    }
}

async function InsertarRetornando(tabla, columnas, valores) {
    try {
        const columna = columnas.join(', ')
        const valor = valores.join(', ')
        const result = await pool.query(`INSERT INTO ${tabla} (${columna}) VALUES (${valor}) RETURNING *`);
        return { message: 'success', fila: result.rows[0] };
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }
}
async function insertarCorreo(correo) {
    try {
        tipo= correo.split('@')[1].split('.')[0];
        const result = await InsertarRetornando('correo', ['cor_url', 'cor_tipo'], [`'${correo}'`, `'${tipo}'`]);
        return result;
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }
    
}
async function crearUsuario(user, password, correo) {
    try {
        const usuarioExistente = await buscarFila(tablaUsuario, 'usu_nombre', user);
        const correoExistente = await buscarFila('correo', 'Cor_Url', correo);

        if (usuarioExistente.message === 'found') {
            return { message: 'username already exists' };
        }

        if (correoExistente.message === 'found') {
            return { message: 'email already exists' };
        }
        const rol = await buscarFila('rol', 'rol_nombre', 'Cliente').rol_id;
        const usuarioInsertado = await InsertarRetornando(tablaUsuario, ['usu_nombre', 'usu_contrasena', 'rol_id'], [`'${user}'`, `'${password}'`, `${rol}`]);
        const correoInsertado = await insertarCorreo(correo).cor_id;
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }
}

export default router; // This is the default export