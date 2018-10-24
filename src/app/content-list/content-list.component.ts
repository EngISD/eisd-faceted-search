import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

   @Input() searchText: string;
  results: any;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.getResults().subscribe(res => this.results = res);
  }

}
