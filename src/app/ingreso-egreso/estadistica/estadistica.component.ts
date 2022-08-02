import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number = 0;
  egresos: number = 0;
  totalEgresos: number = 0;
  totalIngresos: number = 0;
  estadisticaSubs!: Subscription;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.generarEstadistica();
  }

  ngOnDestroy(): void {
      this.estadisticaSubs.unsubscribe();
  }

  generarEstadistica() {
    this.estadisticaSubs = this.store.select('ingresosEgresos').subscribe(({items}) => {
      this.ingresos = 0;
      this.egresos = 0;
      this.totalEgresos = 0;
      this.totalIngresos = 0;
      items.forEach(item => {
        if (item.tipo === 'ingreso') {
          this.ingresos ++;
          this.totalIngresos += item.monto;
        } else {
          this.egresos ++;
          this.totalEgresos += item.monto;
        }
      });

      this.doughnutChartData.datasets = [{data: [this.totalIngresos, this.totalEgresos]}];
    });
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
