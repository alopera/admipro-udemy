import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: any;
  constructor(
    public http: HttpClient,
    public _route: Router
  ) {
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
        localStorage.setItem('tokenAdminPro', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
      })
      );
  }

  logOut(){
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
      })
      );
  }

}
