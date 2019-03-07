import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
      public _router: Router,
      public _userService: UsuarioService
  ) { }

  ngOnInit() {
  }

  CerrarSesion() {
    this._userService.logOut();
  }

}
