import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incremetador',
  templateUrl: './incremetador.component.html',
  styleUrls: ['./incremetador.component.css']
})
export class IncremetadorComponent implements OnInit {

  leyenda: string= 'Leyenda';
  porcentaje: number = 50;
  @Output() cambioProgreso: EventEmitter<number> = new EventEmitter();
  @ViewChild('valorInput') txtValorProgress: ElementRef;

  
  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valorCambioProgreso: number){

    this.porcentaje += valorCambioProgreso;

    if (this.porcentaje < 0) {
      this.porcentaje = 0;
    }

    if (this.porcentaje > 100) {
      this.porcentaje = 100;
    }
      
    this.txtValorProgress.nativeElement.value = this.porcentaje; 
    this.cambioProgreso.emit(this.porcentaje);
  }

  onValueChange(progreso: number) {

    this.porcentaje = progreso;
    if (this.porcentaje < 0) {
      this.porcentaje = 0;
    }

    if (this.porcentaje > 100) {
      this.porcentaje = 100;
    }
    this.txtValorProgress.nativeElement.value = this.porcentaje; 
    
    this.cambioProgreso.emit(this.porcentaje);
  }

  

}
