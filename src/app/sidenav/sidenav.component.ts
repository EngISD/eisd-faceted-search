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
  selectedCategory = [];
  moreCounter = [];

  constructor(private service: ServiceService) { }

  // On initialization, extract keys from the results and set up the checkboxes accordingly
  ngOnInit() {
    this.service.getCategories().subscribe(response => {
      this.categories = response;

      for (let i = 0; i < this.categories.length; i++) {
        this.moreCounter[this.categories[i]] = 2;
        this.service.getCheckboxes(this.categories[i]).subscribe(ress => {
          this.checkboxes[this.categories[i]] = ress.slice(0, 10);
        });
      }
    });
  }
  // Resets all the checkboxes
  reset() {
    for (let i = 0; i < this.categories.length; i++) {
      this.selectedCategory[this.categories[i]] = [];
    }
    this.onNgModelChange();
  }
  // Resets only one group of checkboxes
  resetThis(category: string) {
    this.selectedCategory[category] = [];
    this.onNgModelChange();
  }

  onNgModelChange() {
    // Idea to filter facets
    // this.service.getSearchArray(this.selectedCategory['title']).subscribe(res => {
    //   this.service.updateCheckboxes(res);
    // })
  }
  showMore(cat) {
    this.service.getCheckboxes(cat).subscribe(ress => {
      this.checkboxes[cat] = ress.slice(0, 10 * this.moreCounter[cat]);
      this.moreCounter[cat]++;
    });
  }
  showLess(cat) {
    this.service.getCheckboxes(cat).subscribe(ress => {
      this.checkboxes[cat] = ress.slice(0, 10);
      this.moreCounter[cat] = 2;
    });
  }
  trackByFn(index, result) {
    return index;
  }
}
