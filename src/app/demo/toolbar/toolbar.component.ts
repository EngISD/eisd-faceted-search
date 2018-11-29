import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'demo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // Clears input value
  value = '';
  // Change searchbar colors
  searchColor: string;
  iconColor: string;
  searchResultInternal: any[];
  searchResultCommercial: any[];
  searchResultCustomer: any[];
  searchResultResponsible: any[];
  searchResultProjectManager: any[];
  searchResultCostCenter: any[];
  name = new FormControl('');
  @ViewChild(MatAutocompleteTrigger) panel: MatAutocompleteTrigger;

  constructor(private service: ServiceService) {
  }

  ngOnInit() {
    this.service.clean$.subscribe(res => {
      if (res === true) {
        this.cleanValue();
      }
    });
    this.name.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(res => {
          if (res.length > 2) {
            this.service.getValuesByCustomerText(res.slice(0, 12))
            .pipe(
              debounceTime(500),
              distinctUntilChanged()
            )
              .subscribe(response => {
                this.searchResultCustomer = response['facetOptions'];
              }
            );
            this.service.getValuesBySearchText(res.slice(0, 12))
              .pipe(
                debounceTime(300),
                distinctUntilChanged()
              )
              .subscribe(response => {
                this.searchResultInternal = [0];
                this.searchResultInternal = response['count'];
              }
            );
            this.service.getValuesByCostCenterText(res.slice(0, 12))
              .pipe(
                debounceTime(300),
                distinctUntilChanged()
              )
              .subscribe(response => {
                this.searchResultCostCenter = [];
                this.searchResultCostCenter = response['facetOptions'];
              }
            );
            this.service.getValuesByResponsibleText(res.slice(0, 12))
              .pipe(
                debounceTime(300),
                distinctUntilChanged()
              )
              .subscribe(response => {
                this.searchResultResponsible = [];
                this.searchResultResponsible = response['facetOptions'];
              }
            );
            this.service.getValuesByProjectManagerText(res.slice(0, 12))
              .pipe(
                debounceTime(300),
                distinctUntilChanged()
              )
              .subscribe(response => {
                this.searchResultProjectManager = [];
                this.searchResultProjectManager = response['facetOptions'];
              }
            );
            this.service.getValuesByCommercialText(res.slice(0, 12))
              .pipe(
                debounceTime(300),
                distinctUntilChanged()
              )
              .subscribe(response => {
                this.searchResultCommercial = [];
                this.searchResultCommercial = response['facetOptions'];
              }
            );
          } else {
            this.searchResultInternal = [];
            this.searchResultCustomer = [];
            this.searchResultCostCenter = [];
            this.searchResultResponsible = [];
            this.searchResultProjectManager = [];
            this.searchResultCommercial = [];
          }
  });
  }
  toHome() {
    location.reload();
  }
  // Clears input value
  cleanValue() {
    this.value = '';
    this.name.setValue('');
    this.searchResultInternal = [];
    this.searchResultCommercial = [];
    this.searchResultCostCenter = [];
    this.searchResultCustomer = [];
    this.searchResultProjectManager = [];
    this.searchResultResponsible = [];
  }
  onFocus() {
    this.searchColor = 'white';
    this.iconColor = 'rgb(2, 119, 189)';
  }
  onFocusOut() {
    this.searchColor = 'rgb(2, 107, 170)';
    this.iconColor = 'white';
  }
  // Triggers autocomplete after 2nd letter
  trigger(value: string) {
    if (value.length > 2) {
      return true;
    }
  }
  selectOption(cat: string, value: string, descr: string) {
    let temp;
    if (cat === 'internalOrder') {
      temp = {'cat': cat, 'value': value, 'descr': descr};
    } else {
      temp = {'cat': cat, 'value': value, 'descr': descr};
    }
    this.service.setValueSearch(temp);
  }
  trackByFn(index, item) {
    return index;
  }
}
