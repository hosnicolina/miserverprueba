import { Usuario } from './usuario';

export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() {
        
    }

    //agregar un usuario
    public agregar(usuario: Usuario) {

        this.lista.push( usuario );
        console.log(this.lista);
        return usuario;
    }

    /**
     * actualizarNombre
     */
    public actualizarNombre(id: string, nombre: string) {
     for (const usuario of this.lista) {
         if (usuario.id === id) {
             usuario.nombre = nombre;
             break;
         }
     }
     console.log( this.lista );
     console.log('===actualizando usuario ===');
    }


    /**
     * getLista
     */
    public getLista() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');
    }

    /**
     * getUsuario
     */
    public getUsuario(id: string) {
        
         return this.lista.find( usuario  => usuario.id === id );

    }
    
    /**
     * 
     * @param sala 
     * @returns usuario
     */
    public getUsuarioEnSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    // Borrar usuario
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempUsuario;
    }

}
