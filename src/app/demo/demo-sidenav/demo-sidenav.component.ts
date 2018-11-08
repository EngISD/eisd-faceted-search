import { ServiceService } from './../../service.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, AfterViewChecked } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, PageEvent, MatPaginator, MatDialogConfig } from '@angular/material';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './demo-sidenav.component.html',
  styleUrls: ['./demo-sidenav.component.css']
})
export class DemoSidenavComponent implements OnInit, OnDestroy, AfterViewChecked {

  // Sort variables
  descending: boolean = true;
  option: any = '1';
  options: any[] = [1, 2, 3, 4];
  test: any;

  mobileQuery: MediaQueryList;
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  categories = [
    {id: 'cdc', icon: 'attach_money'},
    {id: 'anno', icon: 'date_range'},
    {id: 'cliente', icon: 'account_box'},
    {id: 'soc', icon: 'business'},
    {id: 'rcdc', icon: 'visibility'},
    {id: 'cp', icon: 'person'},
    {id: 'fun', icon: 'person_outline'},
    {id: 'l136', icon: 'contact_support'},
    {id: 'tr', icon: 'contact_support'},
    {id: 'ta', icon: 'contact_support'},
    {id: 'lp', icon: 'contact_support'},
    {id: 't8', icon: 'contact_support'}
  ];
  content = [];
  checkboxes = [];
  selected1 = [];
  numMore = [];
  hasMore = [];
  dud1 = [];
  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#006dddee';
  public secondaryColour = '#cccccc01';

  barSelected = [];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartColors:Array<any> = [
    {
      backgroundColor: '#0278bd8a',
      borderColor: '#0277bd8a',
      pointBackgroundColor: '#0278bd8a',
      pointBorderColor: '#0277bd8a',
      pointHoverBackgroundColor: '#0277bd8a',
      pointHoverBorderColor: '#0277bd8a'
    }
  ];
  public barChartData:any[] = [
    {data: [], label: ''}
  ];

  // Paginator variables
  page: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentPage = 0;
  length = 0;
  pageSize = 50;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  activePageDataChunk = [];

  @ViewChild(CdkVirtualScrollViewport) scroll: CdkVirtualScrollViewport;

  private _mobileQueryListener: () => void;

  // tslint:disable:max-line-length
  constructor(private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: ServiceService, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    for (let i = 0; i < this.categories.length; i++) {
      this.selected1[this.categories[i].id] = [];
      this.dud1[this.categories[i].id] = [];
    }
  }
  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.loading = true;
    this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.selected1).subscribe(res => {
      this.test = res['data'];
      this.length = res['count'];
      this.activePageDataChunk = this.test;
      this.loading = false;
    });
    for (let i = 0; i < this.categories.length; i++) {
      this.numMore[this.categories[i].id] = 1;
      this.service.getFacets(this.categories[i].id).subscribe(res => {
        this.checkboxes[this.categories[i].id] = res['facetOptions'];
        this.hasMore[this.categories[i].id] = res['hasMore'];

        if (this.categories[i].id == 'anno') {
          const temp = [];
          const temp1 = [];
          for (let j = 0; j < this.checkboxes['anno'].length; j++) {
            temp.push(this.checkboxes['anno'][j].code);
            temp1.push(this.checkboxes['anno'][j].count);
          }
          this.barChartLabels = temp;
          this.barChartData[0] = Object.assign({
            data: temp1, label: 'Number of items'
          });
        }
      });
    }
  }
  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.changeDetectorRef.detach();
  }

  onNgModelChange(cat?) {
    this.loading = true;
    /* setTimeout(() => {
      this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.dud1).subscribe(res => {
        this.test = res['data'];
        this.activePageDataChunk = this.test;
        this.length = res['count'];
        this.loading = false;
      });
    }); */
    this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.selected1).subscribe(res => {
      this.test = res['data'];
      this.activePageDataChunk = this.test;
      this.length = res['count'];
      this.loading = false;
    });

    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id != cat) {
        if (cat == undefined) {
          this.service.getFacets(this.categories[i].id).subscribe(res => {
            this.checkboxes[this.categories[i].id] = res['facetOptions'];
            this.hasMore[this.categories[i].id] = res['hasMore'];

            if (this.categories[i].id == 'anno') {
              const temp = [];
              const temp1 = [];
              for (let j = 0; j < this.checkboxes['anno'].length; j++) {
                temp.push(this.checkboxes['anno'][j].code);
                temp1.push(this.checkboxes['anno'][j].count);
              }
              this.barChartLabels = temp;
              this.barChartData[0] = Object.assign({
                data: temp1, label: 'Number of items'
              });
            }
          });
        } else {
          this.service.refreshFacets(this.categories[i].id, this.selected1).subscribe(res => {
            this.checkboxes[this.categories[i].id] = res['facetOptions'];

            if (this.categories[i].id == 'anno') {
              const temp = [];
              const temp1 = [];
              for (let j = 0; j < this.checkboxes['anno'].length; j++) {
                temp.push(this.checkboxes['anno'][j].code);
                temp1.push(this.checkboxes['anno'][j].count);
              }
              this.barChartLabels = temp;
              this.barChartData[0] = Object.assign({
                data: temp1, label: 'Number of items'
              });
            }
          });
        }
      }
    }
  }

  trackByFn(index, item) {
    return index;
  }
  // Paginator functions
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    this.loading = true;
    this.service.sortAllResults(this.option, e.pageSize, e.pageIndex, this.descending, this.selected1).subscribe(res => {
      this.test = res['data'];
      this.pageSize = e.pageSize;
      this.activePageDataChunk = this.test;
      this.scroll.scrollToIndex(0);
      this.loading = false;
    });
  }
  // Paginator functions

  showMore(cat) {
    ++this.numMore[cat];
    this.service.getFacets(cat, this.numMore[cat]).subscribe(res => {
      this.checkboxes[cat] = res['facetOptions'];
      this.hasMore[cat] = res['hasMore'];
    });
  }
  showLess(cat) {
    this.numMore[cat] = 1;
    this.service.getFacets(cat).subscribe(res => {
      this.checkboxes[cat] = res['facetOptions'];
      this.hasMore[cat] = res['hasMore'];
    });
  }

  // Opens dialog on click
  openDialog(item){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = item;
    if (this.mobileQuery.matches) {
      dialogConfig.height = '100%';
      dialogConfig.width = '100%';
      dialogConfig.hasBackdrop = false;
      dialogConfig.maxWidth = '100%';
    } else {
      dialogConfig.height = '550px';
      dialogConfig.width = '900px';
    }
    this.dialog.open(DialogComponent, dialogConfig);
  }
  // Opens dialog on click

  public chartClicked(e:any):void {
    if (e.active.length > 0) {
      const temp = e.active[0]._model.label;

      const index = this.barSelected.findIndex(x => x == e.active[0]._model.label);
      if (index != -1) {
        this.barSelected.splice(index, 1);
      } else {
        this.barSelected.push(temp);
      }

      this.selected1['anno'] = this.barSelected;

      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].id != 'anno') {
          this.service.refreshFacets(this.categories[i].id, this.selected1).subscribe(res => {
            this.checkboxes[this.categories[i].id] = res['facetOptions'];
          });
        }
      }
      this.loading = true;
      this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.selected1).subscribe(res => {
        this.test = res['data'];
        this.activePageDataChunk = this.test;
        this.length = res['count'];
        this.loading = false;
      });
    }

      /* if (this.categories[i].id == 'anno') {
        const temp = [];
        const temp1 = [];
        for (let j = 0; j < this.checkboxes['anno'].length; j++) {
          temp.push(this.checkboxes['anno'][j].code);
          temp1.push(this.checkboxes['anno'][j].count);
        }
        this.barChartLabels = temp;
        this.barChartData[0] = Object.assign({
          data: temp1, label: 'Number of items'
        });
      } */

  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  resetAll() {
    for (let i = 0; i < this.categories.length; i++) {
      this.selected1[this.categories[i].id] = [];
      this.dud1[this.categories[i].id] = [];
    }
    this.barSelected = [];
    this.onNgModelChange('anno');
  }
  sortResults(){
    this.descending = !this.descending;
    this.sortAllResults();
  }
  sortAllResults(){
    this.loading = true;
    this.pageIndex = 0;
    this.paginator.pageIndex = 0;
    this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.selected1).subscribe(res => {
      this.test = res['data'];
      this.activePageDataChunk = this.test;
      this.loading = false;
    });
  }

  dud(code, cat) {
    const index = this.dud1[cat].indexOf(code);
    if (index == -1) {
      this.dud1[cat].push(code);
    } else {
      this.dud1[cat].splice(index, 1);
    }
  }
}
