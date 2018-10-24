import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  results: any;
  pageSize = 10;
  currentPage = 0;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.getResults().subscribe(res => this.results = res)
  }
  getData(){
    
  }

}
