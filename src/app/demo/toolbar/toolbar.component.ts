import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { debounceTime } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';

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

  constructor(private service: ServiceService) {
  
  }

  ngOnInit() {

  }
  toHome() {
    location.reload();
  }
  // Clears input value
  cleanValue() {
    this.value = '';
    this.searchResultInternal = [];
    this.selectOption(this.value);
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
  selectOption(value: string){
    this.service.setValueSearch(value);
  }

  onKeyUp(text: string) {
    if (text.length > 2) {
      this.service.getValuesBySearchText(text)
        .pipe(
          debounceTime(500)
        )
        .subscribe(response => {
          this.searchResultInternal = response;
        }
      );
      this.service.getValuesByCustomerText(text)
        .pipe(
          debounceTime(500)
        )
        .subscribe(response => {
          this.searchResultCustomer = response;
        }
      );
      this.service.getValuesByCostCenterText(text)
        .pipe(
          debounceTime(500)
        )
        .subscribe(response => {
          this.searchResultCostCenter = response;
        }
      );
      this.service.getValuesByResponsibleText(text)
        .pipe(
          debounceTime(500)
        )
        .subscribe(response => {
          this.searchResultResponsible = response;
        }
      );
      this.service.getValuesByProjectManagerText(text)
        .pipe(
          debounceTime(500)
        )
        .subscribe(response => {
          this.searchResultProjectManager = response;
        }
      );
      this.service.getValuesByCommercialText(text)
        .pipe(
          debounceTime(500)
        )
        .subscribe(response => {
          this.searchResultCommercial = response;
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
