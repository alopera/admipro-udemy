import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

import swal from 'sweetalert';

@Injectable()
export class VerificaTokenGuard implements CanActivate {
  ahora = new Date().getTime() / 1000;
  constructor(
    public _usuarioService: UsuarioService,
    public _router: Router) {
  }

  canActivate(): Promise<boolean> | boolean {

    const token = this._usuarioService.token;
    let payLoad = JSON.parse(atob(token.split('.')[1]));
    let expirado = this.expiroToken(payLoad.exp);

    if (expirado) {
      swal('La sesión ha expirado', 'El tiempo de la sesión ha terminado.', 'info');
      this._usuarioService.logout();
      return false;
    } else {
      if ((payLoad.exp - this.ahora) < 300) {
        return new Promise((resolve, reject) => {
          this._usuarioService.renuevaToken(token).subscribe(resp => {
            resolve(true);
          },
          error => {
            reject(false);
          });
        });
      }
    }
    return true;
  }

  expiroToken(fechaExpiracion) {
    if (fechaExpiracion < this.ahora) {
      return true;
    } else {
      return false;
    }
  }


}
