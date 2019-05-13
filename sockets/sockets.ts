import { Usuario } from './../clasess/usuario';
import { UsuariosLista } from './../clasess/usuarios-listas';
import { Socket } from 'socket.io';
import  socketIO  from 'socket.io';

export const usuarioConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    
    const  usuario = new Usuario( cliente.id );

    usuarioConectados.agregar( usuario );

}

export const desconectar = ( cliente: Socket) => {

    cliente.on('disconnect', () => {
        const usuario = usuarioConectados.borrarUsuario( cliente.id );
    });

}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', ( payload: {de: string, cuerpo: string} ) => {
        
        console.log('Mesaje recibido ', payload);

            io.emit('mensaje-nuevo', payload);


    })
}

// configurar usuario

export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', ( payload: {nombre: string}, callback: ( mgs: object )=> void ) => {

        usuarioConectados.actualizarNombre( cliente.id, payload.nombre );
        callback({
            ok: true,
            mensaje: `Usuario, ${payload.nombre}`
        })

    });
}