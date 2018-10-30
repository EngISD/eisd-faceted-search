import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import {PageEvent, MatPaginator} from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  //Results received from the service
  results: any;
  
  //Paginator variables
  page: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentPage = 0;
  length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  activePageDataChunk = [];
  categories = [];
  //Paginator variables
  
  constructor(private service: ServiceService, public router: Router) { }

  ngOnInit() {
    this.getData();
  }
  trackByFn(index, result) {
    return index;
  }
  //Returns data from the service and slices them to fit page size
  getData(event?: PageEvent) {
    this.service.getResults(event)
      .subscribe(response => {
        this.results = response;
        this.activePageDataChunk = this.results.slice(0, this.pageSize);
        this.length = this.results.length;
      });
    // Used to extract the keys from the results
    this.service.getCategories().subscribe(res => {
      this.categories = res;
      });
    return event;
  }
  //Paginator functions
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.results.slice(firstCut, secondCut);
  }
  //Paginator functions
}
