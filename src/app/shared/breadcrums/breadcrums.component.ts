import { filter, map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { Observable } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-breadcrums",
  templateUrl: "./breadcrums.component.html",
  styleUrls: ["./breadcrums.component.css"]
})
export class BreadcrumsComponent implements OnInit {
  tituloPagina : string;
  constructor(private router: Router,
              private title: Title) {
    this.getDataRoute().subscribe(routeData => {
      console.log(routeData);
      this.tituloPagina = routeData.titulo;
      this.title.setTitle(this.tituloPagina);
    });
  }

  ngOnInit() {

  }

  getDataRoute(): Observable<any> {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }
}
