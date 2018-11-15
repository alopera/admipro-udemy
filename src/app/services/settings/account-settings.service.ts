import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class AccountSettingsService {
  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default-dark.css",
    tema: "default"
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.recuperarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  recuperarAjustes() {
    if (localStorage.getItem("ajustes")) {
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
    } else {
      console.log("usando valores por defecto");
    }
    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(colorTema: string) {
    const urlTema = `assets/css/colors/${colorTema}.css`;
    this.ajustes.temaUrl = urlTema;
    this.ajustes.tema = colorTema;
    this._document.getElementById("tema").setAttribute("href", urlTema);
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
