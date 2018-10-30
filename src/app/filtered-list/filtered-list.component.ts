import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtered-list',
  templateUrl: './filtered-list.component.html',
  styleUrls: ['./filtered-list.component.css']
})
export class FilteredListComponent implements OnInit {

  page: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentPage = 0;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  activePageDataChunk = [];
  categories = [];
  filteredResult: any;

  constructor(private service: ServiceService, public router: Router) { }

  ngOnInit() {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
    });
     this.service.filterValue$.subscribe(res => {
       this.filteredResult = res;
       this.length = this.filteredResult.length;
       this.activePageDataChunk = this.filteredResult.slice(0, this.pageSize);
     });
  }
  trackByFn(index, result) {
    return index;
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.filteredResult.slice(firstCut, secondCut);
  }
}
