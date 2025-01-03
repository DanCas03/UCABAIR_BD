export async function getRoles() {
    return await fetch(`http://localhost:3000/users/getRoles` ,{ headers: { 'Accept': 'application/json' } })
    .then(response => response.json())
    .then(
        (data) => {
            if (data.message === 'success'){
                return data.roles;
            }else if (data.message === 'not found'){
                console.log('No se encontraron roles, error en base de datos');
            }else{
                console.log(data.message);
            }
        }
    )
    .catch((e) => {console.log(e); return '404';})
}

export async function guardarRol(rol, username) {
    return await fetch(`http://localhost:3000/users/guardarRol?rol=${rol}&user=${username}` ,{headers: { 'Accept': 'application/json' } })
    .then(response => response.json())
    .then(
        (data) => {
            if (data.message === 'success'){
                return data.message;
            }else if (data.message === 'not found'){
                console.log('No se encontro el usuario, error en base de datos');
            }else{
                console.log(data.message);
            }
        }
    )
    .catch((e) => {console.log(e); return '404';})
}

export async function getUsers() {
    console.log('getUsers');
    return await fetch(`http://localhost:3000/users/getUsers` ,{ headers: { 'Accept': 'application/json' } })
    .then(response => response.json())
    .then(
        (data) => {
            if (data.message === 'success'){
                const clientes = data.clientes.map((cliente) => {
                    return {username: cliente.usu_nombre, cedula: cliente.cli_cedula, email: cliente.cor_url, name: cliente.cli_nombre, rol: cliente.rol_nombre};
                });
                const proveedores = data.proveedores.map((proveedor) => {
                    return {username: proveedor.usu_nombre, cedula: proveedor.pro_rif, email: proveedor.cor_url, name: proveedor.pro_nombre, rol: proveedor.rol_nombre};
                });
                const empleados = data.empleados.map((empleado) => {
                    return {username: empleado.usu_nombre, cedula: empleado.emp_cedula, email: empleado.cor_url, name: empleado.emp_nombre, rol: empleado.rol_nombre};
                });
                const users = clientes.concat(proveedores).concat(empleados);
                return users;
            }else if (data.message === 'error'){
                console.log('Ocurrio un error en la base de datos');
            }else{
                console.log(data.message);
            }
        }
    )
    .catch((e) => {console.log(e); return '404';})
}