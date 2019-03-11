import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: any;
  usuario: any;
  constructor(
    public http: HttpClient,
    public _route: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario);
  }

  estaLogueado() {
    return localStorage.getItem('tokenAdminPro') !== null;
  }

  login(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/login`;
    return this.http.post(url, { usuario: usuario.email, password: usuario.password })
      .pipe(map((res: any) => {
        this.token = res.token;
        localStorage.setItem('idUsuario', res.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.usuario = res.usuario;
      })
      );
  }

  getUser(): Usuario {
    return JSON.parse(localStorage.getItem('usuario'));
  }

  logOut() {
    this._route.navigate(['/login']);
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('tokenAdminPro');
    localStorage.removeItem('usuario');
  }

  loginGoogle(tokenGoogle: string) {
    const url = `${URL_SERVICIOS}/login/google`;
    return this.http.post(url, { token: tokenGoogle })
      .pipe(map((res: any) => {
        localStorage.setItem('idUsuario', res.id);
        localStorage.setItem('tokenAdminPro', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.usuario = res.usuario;
      })
      );
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        // this.usuario = resp.usuario;
        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
    );

  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {

        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);

      })
      .catch(resp => {
        console.log(resp);
      });

  }

}
