import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';

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
  @ViewChild(MatAutocompleteTrigger) panel: MatAutocompleteTrigger;

  constructor(private service: ServiceService) {
  }

  ngOnInit() {
    this.service.clean$.subscribe(res => {
      if (res === true) {
        this.cleanValue();
      }
    });
  }
  toHome() {
    location.reload();
  }
  // Clears input value
  cleanValue() {
    this.value = '';
    this.searchResultInternal = [];
    this.searchResultCommercial = [];
    this.searchResultCostCenter = [];
    this.searchResultCustomer = [];
    this.searchResultProjectManager = [];
    this.searchResultResponsible = [];
    this.selectOption('internalOrder', '', '');
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
      temp = {'cat': cat, 'value': value, 'descr': value};
    } else {
      temp = {'cat': cat, 'value': value, 'descr': descr};
    }
    this.service.setValueSearch(temp);
  }

  onKeyUp(text) {
    if (text.length > 2) {
      this.service.getValuesByCustomerText(text)
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
        .subscribe(response => {
          this.searchResultCustomer = response['facetOptions'];
          console.log(text);
          console.log(response['facetOptions']);
        }
      );
      this.service.getValuesBySearchText(text)
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(response => {
          this.searchResultInternal = [0];
          this.searchResultInternal = response['count'];
        }
      );
      this.service.getValuesByCostCenterText(text)
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(response => {
          this.searchResultCostCenter = [];
          this.searchResultCostCenter = response['facetOptions'];
          console.log(text);
          console.log(response['facetOptions']);
        }
      );
      this.service.getValuesByResponsibleText(text)
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(response => {
          this.searchResultResponsible = [];
          this.searchResultResponsible = response['facetOptions'];
          console.log(text);
          console.log(response['facetOptions']);
        }
      );
      this.service.getValuesByProjectManagerText(text)
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(response => {
          this.searchResultProjectManager = [];
          this.searchResultProjectManager = response['facetOptions'];
          console.log(text);
          console.log(response['facetOptions']);
        }
      );
      this.service.getValuesByCommercialText(text)
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(response => {
          this.searchResultCommercial = [];
          this.searchResultCommercial = response['facetOptions'];
          console.log(text);
          console.log(response['facetOptions']);
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
  }
  trackByFn(index, item) {
    return index;
  }
}
