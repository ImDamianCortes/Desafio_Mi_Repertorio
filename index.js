//Importar modulos
const http = require('http');
const url = require('url');
const fs = require('fs');

//
const { insertar, consultar, editar, eliminar, consultaVideo } = require('./consultas');

//configuracion del servidor
const host = 'localhost';
const port = 3000;

//Crear servidor
http
    .createServer(async (req, res) => {
        //Peticion GET para la pagina principal
        if (req.url == '/' && req.method === 'GET') {
            //Definir el tipo de contenido
            res.setHeader('Content-Type', 'text/html');
            //Obtener el contenido de la pagina principal
            const html = fs.readFileSync('./index.html');
            //Enviar la respuesta
            res.end(html);
        }
        //Peticion POST para agregar una
        if (req.url == '/cancion' && req.method === 'POST') {
            //Definir el tipo de contenido
            res.setHeader('Content-Type', 'application/json');
            //Obtener el cuerpo de la peticion
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', async () => {
                console.log(body);
                //Convertir el cuerpo de la peticion a un objeto JSON
                const datos = Object.values(JSON.parse(body));
                //Insertar el objeto JSON en la base de datos
                const result = await insertar(datos);
                //Devolver el resultado de la consulta
                res.end(JSON.stringify(result));
            });
        }

        //Peticion GET para obtener todas las canciones
        if (req.url == '/canciones' && req.method === 'GET') {

            //Definir el tipo de contenido
            res.setHeader('Content-Type', 'application/json');
            //Obtener todas las canciones de la base de datos
            const result = await consultar();
            //console.log(result);
            //Devolver el resultado de la consulta
            res.end(JSON.stringify(result.rows));
        }


        //Peticion GET video url
        if (req.url.startsWith('/video?') && req.method == 'GET'){
            //Extraer de las querystring la propiedad nombre
            const { id } = url.parse(req.url, true).query;
            //Definir el tipo de contenido
            res.setHeader('Content-Type', 'application/json');
            //Obtener todas las canciones de la base de datos
            const result = await consultaVideo(id);
            //console.log(result);
            //Devolver el resultado de la consulta
            res.end(JSON.stringify(result));
        }


        //Peticion PUT para editar una cancion
        if (req.url.startsWith("/cancion?") && req.method === 'PUT') {
            //Extraer de las querystring la propiedad id
            const { id } = url.parse(req.url, true).query;
            console.log(id)
            //Definir el tipo de contenido
            res.setHeader('Content-Type', 'application/json');
            //Obtener el cuerpo de la peticion
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', async () => {
                //console.log(body)
                //Convertir el cuerpo de la peticion a un objeto JSON
                const datos = Object.values(JSON.parse(body));
                //console.log(datos)
                //Insertar el objeto JSON en la base de datos
                const result = await editar(id, datos);
                res.statusCode = 200;
                console.log(result);
                //Devolver el resultado de la consulta
                res.end(JSON.stringify(result));
            
            });
        }
        //Peticion DELETE para eliminar una cancion
        if (req.url.startsWith('/cancion?') && req.method == 'DELETE') {
            //Extraer de las querystring la propiedad id
            const { id } = url.parse(req.url, true).query;
            console.log(id)
            const respuesta = await eliminar(id);
            res.end(JSON.stringify(respuesta));
        }


    }).listen(port, () => {
        console.log(`\nServer running at http://${host}:${port}/\n`);
    });