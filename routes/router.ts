import { usuarioConectados } from './../sockets/sockets';
import { Socket } from 'socket.io';
import { Router, Request, Response } from 'express';
import Server from '../clasess/server';

const router = Router();


router.get('/mensajes', ( req: Request, res: Response ) => {
    

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    })

});

router.post('/mensajes', ( req: Request, res: Response ) => {


    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        mensaje: 'POST',
        cuerpo,
        de,
        id
    })

});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {


    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: 'POST',
        cuerpo,
        de,
        id
    })

});


// servicio para obtener todos los id de los usuarios

router.get('/usuarios', ( req: Request, res: Response ) => {

    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[] ) => {
        
        if ( err ) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clientes
        })

    } );

});

//obtener usuarios y sus nombres

router.get('/usuarios/detalles', ( req: Request, res: Response ) => {


    res.json({
        ok:true,
        clientes: usuarioConectados.getLista()
    })



});

export default router;