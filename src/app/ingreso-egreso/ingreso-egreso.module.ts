import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrderIngresoPipe } from '../pipes/order-ingreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrderIngresoPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }
