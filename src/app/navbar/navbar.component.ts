import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() searchText = new EventEmitter;
  result: any;
  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  onKeyUp(text: string) {
    if (text.length > 2) {
      this.service.getSearchedItem(text).pipe(
        debounceTime(300)
      ).subscribe(response => {
        this.result = response.slice(0, 10);
      }
      );
    }
  }

  trackByFn(index, item) {
    return index;
  }
}
