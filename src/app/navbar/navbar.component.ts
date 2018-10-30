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

  // Results received from the service
  result: any;

  constructor(private service: ServiceService, private route: Router) { }

  ngOnInit() {
  }

  // Function which brings up the options while typing
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
  // Function triggered when Enter button is pressed to fetch the results
  onEnter(e){
    this.service.setFilteredValue(e);
    this.route.navigateByUrl('/filter');
  }
  trackByFn(index, item) {
    return index;
  }
  // Function triggered when the option is selected
  selectOption(value){
    this.service.setFilteredValue(value);
    this.route.navigateByUrl('/filter');
  }

}
