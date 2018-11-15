import { Component, OnInit, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { AccountSettingsService } from "src/app/services/service.index";


@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(public _ajustes: AccountSettingsService) {}

  ngOnInit() {
    this.cargarCheck();
  }

  cambiarColorTema(colorTema: string, link: any) {
    console.log(colorTema);
    this._ajustes.aplicarTema(colorTema);
    this._ajustes.guardarAjustes();
    this.aplicarCheck(link);
  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName("selector");
    for (let ref of selectores) {
      ref.classList.remove("working");
    }

    link.classList.add("working");
  }

  cargarCheck() {
    let selectores: any = document.getElementsByClassName("selector");
    let tema = this._ajustes.ajustes.tema;

    for (let ref of selectores) {
      if (ref.getAttribute("data-theme") === tema) {
        ref.classList.add("working");
        break;
      }
    }
  }
}
