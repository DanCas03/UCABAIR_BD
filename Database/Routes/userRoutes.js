import express from "express";
import pg from "pg";
import { pool } from '../Postgres_connection.js';

const router = express.Router();
//rutas
router.get("/login", async(req, res) => {
    try {
        pool.query(`SELECT usu_nombre, usu_contrasena FROM `+ tabla+ ` WHERE usu_nombre = '${req.query.user}' `, (error, results) => {
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
//funciones

const tabla = 'usuario'; // Nombre de la tabla que estoy usando... para hacer la prueba


export default router; // This is the default export