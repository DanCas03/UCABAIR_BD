import express from "express";
import pg from "pg";
import { pool } from '../Postgres_connection.js';
import { buscarFila, InsertarRetornando, Select1Tabla } from './funciones.js';

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
router.get("/getRoles", async(req, res) => {
    try {
        const result = await Select1Tabla('rol', ['rol_nombre'], []);
        if (result.message === 'found') {
            const roles = result.filas.map((rol) => {
                return rol.rol_nombre;
            });
            res.send({roles: roles, message: 'success'});
        } else {
            res.send({message: result.message});
        }
    } catch (error) {
        console.log(error);
        res.send({message: 'error'})
    }

});
router.put("/guardarRol", async(req, res) => {
    try {
        const user = await buscarFila(tablaUsuario, 'usu_nombre', req.query.user);
        if (user.message === 'found') {
            const rol = await buscarFila('rol', 'rol_nombre', req.query.rol);
            if (rol.message === 'found') {
                const result2 = await pool.query(`UPDATE ${tablaUsuario} SET rol_id = ${rol.fila.rol_id} WHERE usu_nombre = '${req.query.user}'`);
                res.send({message: 'success'});
            } else {
                res.send({message: 'role not found'});
            }
        } else {
            res.send({message: 'user not found'});
        }
    } catch (error) {
        console.log(error);
        res.send({message: 'error'})
    }

});
router.get("/getUsers", async(req, res) => {
    try {
        const clientes = await getClientesRol();
        const proveedores = await getProveedorRol();
        const empleados = await getEmpleadoRol();
        if (clientes.message === 'error' || proveedores.message === 'error' || empleados.message === 'error') {
            res.send({message: 'error'});
        }
        res.send({clientes: clientes, proveedores: proveedores, empleados: empleados, message: 'success'});
        
    } catch (error) {
        console.log(error);
        res.send({message: 'error'})
    }

});
//funciones
async function getClientesRol() {
    try {
        pool.query(`SELECT U.usu_nombre, C.Cli_cedula, C.Cli_nombre, R.rol_nombre, Cor.Cor_url
            FROM usuario U, cliente C, rol R, correo Cor
            WHERE C.usu_id=U.usu_Id AND U.rol_id=R.rol_id AND Cor.cli_id=C.cli_id`, (error, results) => {
            if (error) {
                throw error;
            }
            return results.rows;
        });
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }
}

async function getProveedorRol() {
    try {
        pool.query(`SELECT U.usu_nombre, P.Pro_rif, P.Pro_nombre, R.rol_nombre, Cor.Cor_url
            FROM usuario U, proveedor P , rol R, correo Cor
            WHERE P.usu_id=U.usu_Id AND U.rol_id=R.rol_id AND Cor.Por_id=P.pro_id`, (error, results) => {
            if (error) {
                throw error;
            }
            return results.rows;
        });
    } catch (error) {
        console.log(error);
        return { message: 'error' };
    }

}

async function getEmpleadoRol() {
    try {
        pool.query(`SELECT U.usu_nombre, E.emp_cedula, E.emp_nombre, R.rol_nombre, Cor.Cor_url
            FROM usuario U, empleado E, rol R, correo Cor
            WHERE E.usu_id=U.usu_Id AND U.rol_id=R.rol_id AND Cor.emp_id=E.emp_id`, (error, results) => {
            if (error) {
                throw error;
            }
            return results.rows;
        });
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