import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';
import { AppStateWithIngreso } from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppStateWithIngreso>
  ) { }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe(({isLoading}) => this.cargando = isLoading);
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
      this.loadingSubs.unsubscribe();
  }

  guardar() {
    if(this.ingresoForm.invalid) {return;}
    this.store.dispatch(ui.isLoading());
    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = {descripcion, monto, tipo: this.tipo};
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      this.ingresoForm.reset();
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Registro creado', descripcion, 'success');
    }).catch(err => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Error', err.message, 'error');
    });
  }

}
