import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-filters',
  templateUrl: './data-filters.component.html',
  styleUrls: ['./data-filters.component.scss'],
})
export class DataFiltersComponent implements OnInit {
  filterDataForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  createForm(): void {
    this.filterDataForm = new FormGroup({
      emirate: new FormControl(null),
      gender: new FormControl(null),
      area: new FormControl(null),
      performingFacility: new FormControl(null),
      referringFacility: new FormControl(null),
      testDate: new FormControl(null),
      occupation: new FormControl(null),
      sponsorName: new FormControl(null),
    });
  }
}
