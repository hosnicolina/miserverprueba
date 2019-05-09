import { SERVER_PORT } from './global/environment';
import Server from './clasess/server';
import  router  from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();

// Body Parser
server.app.use( bodyParser.urlencoded( { extended: true } ) );
server.app.use( bodyParser.json() );

// cors
server.app.use( cors( { origin:true, credentials:true } ) )

// rutas de servicios
server.app.use('/', router);

server.start( ()=>{
    console.log(`El servidor esta corriendo ${SERVER_PORT}`);
} );

