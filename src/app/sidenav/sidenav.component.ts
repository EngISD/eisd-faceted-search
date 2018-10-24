import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  categories = [];
  checkboxes = [ 'checkbox 1', 'checkbox 2', 'checkbox 3', 'checkbox 4' ];
  results: any;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.getRawResults().subscribe(response => {
      this.results = response;
      this.categories = (Object.keys(this.results[1]));
    });

  }

  onNgModelChange($event) {
    console.log($event);
  }

  uniqueItems(data, key) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const value = data[i][key];
      if (result.indexOf(value) === -1) {
        result.push(value);
      }
    }
    return result;
  }

  trackByFn(index, result) {
    return index;
  }
}
