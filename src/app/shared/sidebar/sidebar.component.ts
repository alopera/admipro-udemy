import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor( public _sidebar: SidebarService,
               public _userService: UsuarioService  ) { }

  ngOnInit() {
    this.usuario = this._userService.getUser();
  }

}
