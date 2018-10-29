import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  categories = [];
  checkboxes: {[id: string]: any } = {};
  results: any;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.getCategories().subscribe(response => {
      this.categories = response;

      for (let i = 0; i < this.categories.length; i++) {
        this.service.getCheckboxes(this.categories[i]).subscribe(ress => {
          this.checkboxes[this.categories[i]] = ress;
        });
      }
      // FOR loop that isolates only unique items from all records
      //   for every category of facet, then it sorts that new array by count of number of appearing
      //     in all records, and at last it slices that array to show only first 5 elements
      //       NOT WORKING BECAUSE WE USE FOR LOOP 5 TIMES ON HUGE ARRAY - causes crash
      //         BUT WORKS FOR SMALL ARRAYS :(
      /* for (let i = 0; i < this.categories.length; i++) {
        this.checkboxes[this.categories[i]] = this.uniqueItems(this.results, this.categories[i])
                                                          .sort((n1, n2) => {
                                                            if (this.count(this.categories[i], n1) > this.count(this.categories[i], n2)) {
                                                              return 1;
                                                            }
                                                            if (this.count(this.categories[i], n1) < this.count(this.categories[i], n2)) {
                                                              return -1;
                                                            }
                                                              return 0;
                                                          }).slice(0, 5);
      } */
    });
    /* this.service.getCheckboxes('year').subscribe(response => {
      this.checkboxes.year = response;
    }); */

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

  count(prop, value) {
    let result = 0;
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i][prop] == value) {
        result++;
      }
    }
    return result;
  }

  trackByFn(index, result) {
    return index;
  }
}
