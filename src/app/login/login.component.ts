import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert';
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2: any;
  constructor(public router: Router,
    public _userService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '542869240977-gsca3deubmkh40gtpmt1cqau53dtm9rs.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      const tokenGoogle = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle(tokenGoogle).subscribe(res => {
        this.router.navigate(['/dashboard']);
      });
    });
  }

  ingresar(formulario: NgForm) {
    console.log(formulario.value);
    if (formulario.invalid) {
      return;
    }
    console.log(formulario.value);
    const usuario = new Usuario(null, formulario.value.email, formulario.value.password);
    this._userService.login(usuario).subscribe(res => {
      this.router.navigate(['/dashboard']);
    },
      error => {
        swal('Datos incorrectos', 'Usuario y/o contraseña inválidos', 'error');
      });



  }

}
