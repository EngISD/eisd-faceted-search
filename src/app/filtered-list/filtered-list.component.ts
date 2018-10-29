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


  results: any;
  page: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentPage: number = 0;
  length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  activePageDataChunk = [];
  categories = [];
  filteredResults: any;
  bindFilter: any;

  constructor(private service: ServiceService, public router: Router) { }

  ngOnInit() {
     this.getFilteredData();
     this.service.getCategories().subscribe(res => {
      this.categories = res;
     });
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
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.results.slice(firstCut, secondCut);
  }


  @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {
        this.getFilteredData();
    }
}
