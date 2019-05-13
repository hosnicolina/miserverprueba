import { Usuario } from './../clasess/usuario';
import { UsuariosLista } from './../clasess/usuarios-listas';
import { Socket } from 'socket.io';
import  socketIO  from 'socket.io';

export const usuarioConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server ) => {
    
    const  usuario = new Usuario( cliente.id );

    usuarioConectados.agregar( usuario );

    

}

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('disconnect', () => {
        const usuario = usuarioConectados.borrarUsuario( cliente.id );
        io.emit('usuarios-activos', usuarioConectados.getLista() )
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
        io.emit('usuarios-activos', usuarioConectados.getLista() )
        callback({
            ok: true,
            mensaje: `Usuario, ${payload.nombre}`
        })

    });
}

// obtener usuarios

export const obtenerUsurio = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to( cliente.id ).emit('usuarios-activos', usuarioConectados.getLista() )
    })
}