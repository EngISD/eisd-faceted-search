import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-filtered-list',
  templateUrl: './filtered-list.component.html',
  styleUrls: ['./filtered-list.component.css']
})
export class FilteredListComponent implements OnInit {

  // Data received from the service
  filteredResult: any;
  categories = [];

  // Paginator variables
  page: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentPage = 0;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  activePageDataChunk = [];
  // Paginator variables

  // Scroll customization
  @ViewChild(CdkVirtualScrollViewport) scroll: CdkVirtualScrollViewport;
 

  constructor(private service: ServiceService, public router: Router) { }

  /* On initialization, keys are extracted from the results and 
  results are filtered based on the value from the previous page */
  ngOnInit() {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
    });
     this.service.filterValue$.subscribe(res => {
       this.filteredResult = res;
       if (Array.isArray(this.filteredResult)) {
        this.length = this.filteredResult.length;   
        this.activePageDataChunk = this.filteredResult.slice(0, this.pageSize);
       } else {
         this.length = 1;
         this.activePageDataChunk = [];
         this.activePageDataChunk.push(this.filteredResult);
       }
       
       // Paginator resets to first page
       this.paginator.firstPage();
     });
  }
  trackByFn(index, result) {
    return index;
  }
  // Paginator functions
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    this.pageSize = e.pageSize;
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.scroll.scrollToIndex(0); // Returns the scroll to top when page changes
    this.activePageDataChunk = this.filteredResult.slice(firstCut, secondCut);
  }
  // Paginator functions
}
