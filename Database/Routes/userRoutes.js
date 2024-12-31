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
        const result = await crearUsuario(req.query.user, req.query.password, req.query.email, req.query.cedula);
        console.log(result.message);
        if (result.message === 'success') {
            const result2 = await crearCliente(req.query.name, req.query.lastname, req.query.address2, req.query.address, req.query.user, req.query.phone, req.query.pagWeb, req.query.cedula, 2);
            if (result2.message === 'success') {
                res.send({message: 'success'});
            } else {
                res.send(result2);
            }
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.send({message: 'error'})
    }

});
//funciones

 export async function buscarFila(tabla,columna, dato) {
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

export async function InsertarRetornando(tabla, columnas, valores) {
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
        const tipo= correo.split('@')[1].split('.')[0];
        const result = await InsertarRetornando('correo', ['cor_url', 'cor_tipo'], [`'${correo}'`, `'${tipo}'`]);
        return result;
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }
    
}
async function crearUsuario(user, password, correo, cedula) {
    try {
        const usuarioExistente = await buscarFila(tablaUsuario, 'usu_nombre', user);
        const correoExistente = await buscarFila('correo', 'Cor_Url', correo);
        const clienteExistente = await buscarFila('cliente', 'cli_cedula', cedula);
        if (clienteExistente.message === 'found') {
            return { message: 'client already exists' };
        }

        if (usuarioExistente.message === 'found') {
            return { message: 'username already exists' };
        }

        if (correoExistente.message === 'found') {
            return { message: 'email already exists' };
        }
        const rol = await buscarFila('rol', 'rol_nombre', 'Cliente');
        const usuarioInsertado = await InsertarRetornando(tablaUsuario, ['usu_nombre', 'usu_contrasena', 'rol_id'], [`'${user}'`, `'${password}'`, `${rol.fila.rol_id}`]);
        const correoInsertado = (await insertarCorreo(correo)).fila.cor_id; //falta cambiar inserts de correo
        return usuarioInsertado;
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }
}

async function crearCliente(nombre, apellido, direccion2, direccion1, usuario, telefono, pagWeb, cedula, lugarId) {
    try {
        const clienteExistente = await buscarFila('cliente', 'cli_cedula', cedula);
        if (clienteExistente.message === 'found') {
            return { message: 'client already exists' };
        }
        const usuarioId = await buscarFila(tablaUsuario, 'usu_nombre', usuario);
        console.log(usuarioId);
        const name = nombre + ' ' + apellido;
        const direccion = direccion1 + ' ' + direccion2;
        const hoy = new Date();
        console.log('paso');
        const clienteInsertado = await InsertarRetornando('cliente', ['cli_nombre', 'cli_cedula', 'cli_direccion','cli_monto_acreditado', 'Cli_Pag_Web', 'Cli_Fecha_Ini_Op','lug_id', 'usu_id'],
             [`'${name}'`, `'${cedula}'`, `'${direccion}'`,'0',`'${pagWeb}'` ,`'24/03/2024'`,`${lugarId}`, `${usuarioId.fila.usu_id}`]);
        console.log(clienteInsertado);
        // const telefonoInsertado = await insertarTelefono(telefono, clienteInsertado.fila.cli_id); Hay que cambiar el form para que se pueda ingresar el telefono con el codigo de area
        // console.log(telefonoInsertado.message);
        return clienteInsertado;
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }
}

async function insertarTelefono(telefono, clienteId) {
    try {
        const result = await InsertarRetornando('telefono', ['tel_numero', 'cli_id'], [`'${telefono}'`, `${clienteId}`]);
        return result;
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }
}

export default router; // This is the default export