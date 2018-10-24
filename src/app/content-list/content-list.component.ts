import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import {PageEvent, MatPaginator} from '@angular/material';


@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  results: any;
  page: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentPage: number = 0;
  length = 10000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  activePageDataChunk = [];

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getData();
  }
  trackByFn(index, result){
    return index;
  }
  getData(event?:PageEvent){
    this.service.getResults(event).subscribe(response => {
      this.results = response;
      this.activePageDataChunk = this.results.slice(0,this.pageSize);
    });
    return event;
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.results.slice(firstCut, secondCut);
  }

}
