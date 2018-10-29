import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtered-list',
  templateUrl: './filtered-list.component.html',
  styleUrls: ['./filtered-list.component.css']
})
export class FilteredListComponent implements OnInit {

  results: any;
  page: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentPage: number = 0;
  length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  activePageDataChunk = [];
  categories = ['title','year'];
  filteredResults: any;
  bindFilter: any;

  constructor(private service: ServiceService, public router: Router) { }

  ngOnInit() {
     this.getFilteredData(); 
     /* this.service.getFilteredData(this.bindFilter).subscribe(
       res => {this.filteredResults = res;
        console.log(this.filteredResults);
        this.categories = (Object.keys(this.filteredResults[1])); }
     ) */
     
     
  }
  trackByFn(index, result){
    return index;
  }
  getFilteredData() {
    return this.service.getSelected();

  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.results.slice(firstCut, secondCut);
  }
  
  ngDoCheck(): void {
    /* this.service.getFilteredData(this.bindFilter).subscribe(
      res => {this.filteredResults = res;
       console.log(this.filteredResults);
       this.categories = (Object.keys(this.filteredResults[1])); }
    )*/
  } 
}
