import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  constructor(
    public _router: Router,
    public _userService: UsuarioService
  ) {
  }

  ngOnInit() {
    this.usuario = this._userService.getUser();
  }

  CerrarSesion() {
    this._userService.logOut();
  }

}
