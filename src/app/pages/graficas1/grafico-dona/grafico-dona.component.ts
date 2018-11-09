import { Component, OnInit, Input } from "@angular/core";
import { Color } from "ng2-charts";

@Component({
  selector: "app-grafico-dona",
  templateUrl: "./grafico-dona.component.html",
  styleUrls: ["./grafico-dona.component.css"]
})
export class GraficoDonaComponent implements OnInit {
  @Input() tituloGrafico: string;
  @Input() data: number[] = [350, 450, 100];
  @Input() labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() chartType: string = 'prueba';
  @Input() colors: Color[];

  constructor() {}

  ngOnInit() {}
}
