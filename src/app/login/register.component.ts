import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService,
  public _route: Router) { }

  sonIguales(valor1: string, valor2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[valor1].value;
      const pass2 = group.controls[valor2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, { validators: this.sonIguales('password', 'confirmPassword') });
  }


  registrarUsuario() {
    console.log(this.forma);

    if (this.forma.invalid) {
      swal('Importante', 'complete de forma correcta los campos del formulario', 'info');
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'info');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe(resp => {
      if (resp) {
        console.log(resp);
        swal('Usuario creado', 'Se ha creado el usuario con éxito', 'success');   
        this.forma.reset();
        this._route.navigate(['/login']);
      }
    },
  error => {
    console.log(error);
    swal('Error creando el usuario', 'El usuario ya existe', 'info');
  });
  }

  init_plugins() {

  }

}
