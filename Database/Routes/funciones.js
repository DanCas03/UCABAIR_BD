// Description: Funciones para realizar consultas sencillas y genericas a la base de datos.

export async function buscarFila(tabla,columna, dato) { // Busca una fila en la tabla que sea igual al dato dado y retorna la fila
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

export async function InsertarRetornando(tabla, columnas, valores) { // Inserta una fila en la tabla y retorna la fila insertada
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

export async function Select1Tabla(tabla, columnas,condiciones) { // Hace un select (devuelve las filas) de una unica tabla con una condicion dada
    try {
        let query = `SELECT ${columnas.join(', ')} FROM ${tabla}`;
        if (condiciones.length > 0) query += `WHERE ${condiciones.join(' AND ')}`;
        const result = await pool.query(query);
        if (result.rows.length == 0){
            return {message :'not found'};
        }else{
            return {filas: result.rows, message: 'found'};
        }       
    } catch (error) {
        console.log(error);
        return { message: 'error' };        
    }
}