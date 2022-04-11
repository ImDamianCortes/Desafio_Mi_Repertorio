//Paso 1: Importar el paquete pg
const { Pool } = require("pg");

//crear una instancia de la clase Pool, definiendo las propiedades básicas para una consulta.
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "123456",
    port: 5432,
    database: "repertorio" //Base de datos a utilizar
});

// función asíncrona llamada “insertar” que reciba un parámetro “datos”.
const insertar = async (datos) => {
    // consulta parametrizada con un JSON como argumento definiendo como “values” el parámetro “datos”
    //console.log(datos);
    const consulta = {
        text: "INSERT INTO repertorio values(DEFAULT, $1, $2, $3, $4) RETURNING *",
        values: datos,
        rowMode: "array" //Para obtener un arreglo de objetos
    };
    try {
        const result = await pool.query(consulta);
        console.log(result.rows[0]); //Ultimo registro insertado
        return result; //devuelve el objeto result de la consulta
    } catch (error) {
        console.log(error.code); //Error de consulta
        return error; //devuelve el objeto error de la consulta
    }
};

//Función consultar
const consultar = async () => {
    try {
        const result = await pool.query("SELECT * FROM repertorio");
        //console.log(result.rows);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}

//Funcion editar
const editar = async (id, datos) => {
    //console.log(datos);
    //console.log(id);
    const consulta = {
        text: `UPDATE repertorio SET cancion=$1, artista=$2, tono=$3, link=$4 WHERE id=${id} RETURNING *`,
        values: datos,
        rowMode: "array"
    };
    try {
        const result = await pool.query(consulta);
        //console.log(result) //resultado de la consulta
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}

//Funcion para eliminar
const eliminar = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM repertorio WHERE id = '${id}'`);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}

//Función consultar
const consultaVideo = async (id) => {
    try {
        const result = await pool.query(`SELECT * FROM repertorio WHERE id = '${id}'`);
        const link = result.rows[0].link
        const urlId = link.split("=")[1]
        const urlVideo = `https://www.youtube.com/embed/${urlId}`
        // console.log(link);
        // console.log(link.split("=")[1]);
        return urlVideo;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}

//Exportar un módulos
module.exports = { insertar, consultar, editar, eliminar, consultaVideo};
































//Paso 2: Crear una función asíncrona que devuelva el objeto result de una consulta
//SQL con la instrucción “SELECT NOW()”.

const getDate = async () => {
    const result = await pool.query("SELECT NOW()");
    return result;
};


