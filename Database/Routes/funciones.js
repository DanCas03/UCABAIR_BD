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