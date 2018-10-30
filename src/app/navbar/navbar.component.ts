import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  result: any;
  categories = [];
  constructor(private service: ServiceService, private route: Router) { }

  ngOnInit() {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

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
  onEnter(e) {
    this.service.setFilteredValue(e);
    this.route.navigateByUrl('/filter');
  }
  trackByFn(index, item) {
    return index;
  }
  selectOption(value) {
    this.service.setFilteredValue(value);
    this.route.navigateByUrl('/filter');
  }

}
