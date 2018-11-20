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
  searchResult: any[];
  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

  constructor(private service: ServiceService) {
   }

  ngOnInit() {

  }

  toHome() {
    location.reload();
  }
  cleanValue() {
    this.value = '';
    this.searchResult = [];
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
          this.searchResult = response['data'].slice(0, 50);
        }
      );
    } else {
      this.searchResult = [];
    }
  }
  trackByFn(index, item) {
    return index;
  }
}
