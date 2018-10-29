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

  constructor(private service: ServiceService, private route: Router) { }

  ngOnInit() {
  }

  onKeyUp(text: string) {
    console.log(text);
    
    if (text.length > 2) {
      this.service.getSearchedItem(text).pipe(
        debounceTime(300)
      ).subscribe(response => {
        this.result = response.slice(0, 50);
      }
      );
    }
  }
  onEnter(e){
    this.service.setFilteredValue(e);
    this.route.navigateByUrl('/filter');
  }

  trackByFn(index, item) {
    return index;
  }
  selectOption(value){
    this.service.setFilteredValue(value);
    this.route.navigateByUrl('/filter');
  }
}
