import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs!: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private IngresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresoEgreso').subscribe(({items}) => {
      this.ingresosEgresos = items;
    });
  }

  ngOnDestroy(): void {
      this.ingresosSubs.unsubscribe();
  }

  borrar(uid: string = '') {
    this.IngresoEgresoService.borrarIngresoEgreso(uid).then(resp => {
      Swal.fire('Eliminado', 'Item eliminado correctamente', 'success');
    }).catch(err => {
      Swal.fire('Error', err.message, 'error');
    });
  }
}
