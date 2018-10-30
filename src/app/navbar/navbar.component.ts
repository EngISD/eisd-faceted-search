import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Results received from the service
  result: any;
  categories = [];
  value: string = '';

  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;
  constructor(private service: ServiceService, private route: Router) { }

  ngOnInit() {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  // Function which brings up the options while typing
  onKeyUp(text: string) {
    if (text.length > 2) {
      this.service.getSearchedItem(text).pipe(
        debounceTime(500)
      ).subscribe(response => {
        this.result = response.slice(0, 20);
      }
      );
    }
  }
  trigger(value: string) {
    if (value.length > 2) {
      return true;
    }
  }
  // Function triggered when Enter button is pressed to fetch the results
  onEnter(e) {
    this.service.setFilteredValue(e);
    this.autoTrigger.closePanel();
    this.route.navigateByUrl('/filter');
  }
  trackByFn(index, item) {
    return index;
  }
  // Function triggered when the option is selected and returns only one value
  selectOption(value) {
    this.service.pushObject(value);
    this.route.navigateByUrl('/filter');
  }
  clean() {
    this.value = '';
    this.service.setFilteredValue(this.value);
    this.route.navigateByUrl('/filter');
  }
}
