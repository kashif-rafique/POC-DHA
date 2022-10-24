import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private chartsData: DashboardChartsData) {
  }
  isFilterOpen: boolean = false;
  onToggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }
}
