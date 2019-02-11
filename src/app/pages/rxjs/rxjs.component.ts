import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {

   this.subscription = this.retornaObservable().subscribe(
      numero => console.log(numero),
      error => console.log(error),
      () => console.log('El observador terminó')
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  retornaObservable(): Observable<any> {

    return new Observable((observable: Subscriber<any>) => {
      let contador = 1;
      const intervalo = setInterval(() => {
        contador += 1;
        const salida = {
          valor: contador
        };
        observable.next( salida );
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observable.complete();
        // }

   
      }, 1000);
    }).pipe(
      map(resp => {
        return resp.valor;
      }),
      filter((valor, index) => {
          if ((valor % 2) !== 0) {
            return true;
          } else {
            return false;
          }
      })
    );
  }

}
