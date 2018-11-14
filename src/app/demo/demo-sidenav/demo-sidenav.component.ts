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
  option: any = 'Inizio Validita';
  options = [
    {id: '1', value: 'Inizio Validita'},
    {id: '2', value: 'Descrizione'},
    {id: '3', value: 'Cliente'}, 
    {id: '4', value: 'Responsabile del Progetto'},
    {id: '5', value: 'Centro di costo Descrizione'},
    {id: '6', value: 'Responsabile Commerciale'}, 
    {id: '7', value: 'Centro di costo Responsabile'},
    {id: '8', value: 'Costi'},
    {id: '9', value: 'Ricavi'},
    {id: '10', value: 'Linea Prodotto'},
    {id: '11', value: 'Stato'},
    {id: '12', value: 'Tipo Avanzamento'}, 
    {id: '13', value: 'Tipo Ricavo'}, 
    {id: '14', value: 'Azienda Descrizione'},   
  ];
  test: any;

  mobileQuery: MediaQueryList;
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  categories = [
    {id: 'cdc', icon: 'euro_symbol'},
    {id: 'anno', icon: 'date_range'},
    {id: 'cliente', icon: 'account_box'},
    {id: 'soc', icon: 'business'},
    {id: 'rcdc', icon: 'visibility'},
    {id: 'cp', icon: 'person'},
    {id: 'fun', icon: 'person_outline'},
    {id: 'l136', icon: 'outlined_flag'},
    {id: 'tr', icon: 'outlined_flag'},
    {id: 'ta', icon: 'outlined_flag'},
    {id: 'lp', icon: 'outlined_flag'},
    {id: 't8', icon: 'outlined_flag'}
  ];
  content = [];
  checkboxes = [];
  numMore = [];
  hasMore = [];
  selectedFilters = [];
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
      this.selectedFilters[this.categories[i].id] = [];
    }
  }
  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.loading = true;
    this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.selectedFilters).subscribe(res => {
      this.test = res['data'];
      this.length = res['count'];
      this.activePageDataChunk = this.test;
      this.loading = false;
    });
    for (let i = 0; i < this.categories.length; i++) {
      this.numMore[this.categories[i].id] = 1;
      this.service.refreshFacets(this.categories[i].id, this.selectedFilters).subscribe(res => {
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
  onNgModelChange() {
    this.loading = true;
    this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.selectedFilters).subscribe(res => {
      this.test = res['data'];
      this.activePageDataChunk = this.test;
      this.length = res['count'];
      this.loading = false;
    });

    for (let i = 0; i < this.categories.length; i++) {
          this.service.refreshFacets(this.categories[i].id, this.selectedFilters, this.numMore[this.categories[i].id]).subscribe(res => {
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

  trackByFn(index, item) {
    return index;
  }
  // Paginator functions
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    this.loading = true;
    this.service.sortAllResults(this.option, e.pageSize, e.pageIndex, this.descending, this.selectedFilters).subscribe(res => {
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
    this.service.refreshFacets(cat, this.selectedFilters, this.numMore[cat]).subscribe(res => {
      this.checkboxes[cat] = res['facetOptions'];
      this.hasMore[cat] = res['hasMore'];
    });
  }
  showLess(cat) {
    this.numMore[cat] = 1;
    this.service.refreshFacets(cat, this.selectedFilters).subscribe(res => {
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
      this.selectedFilters['anno'] = this.barSelected;
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].id != 'anno') {
          this.service.refreshFacets(this.categories[i].id, this.selectedFilters, this.numMore[this.categories[i].id]).subscribe(res => {
            this.checkboxes[this.categories[i].id] = res['facetOptions'];
            this.hasMore[this.categories[i].id] = res['hasMore'];
          });
        }
      }
      this.loading = true;
      this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.selectedFilters).subscribe(res => {
        this.test = res['data'];
        this.activePageDataChunk = this.test;
        this.length = res['count'];
        this.loading = false;
      });
    }

  }

  resetAll() {
    for (let i = 0; i < this.categories.length; i++) {
      this.selectedFilters[this.categories[i].id] = [];
      this.numMore[this.categories[i].id] = 1;
    }
    this.barSelected = [];
    this.onNgModelChange();
  }
  sortResults(){
    this.descending = !this.descending;
    this.sortAllResults();
  }
  sortAllResults(){
    this.loading = true;
    this.pageIndex = 0;
    this.paginator.pageIndex = 0;
    this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.selectedFilters).subscribe(res => {
      this.test = res['data'];
      this.activePageDataChunk = this.test;
      this.loading = false;
    });
  }

  select(code, cat) {
    const index = this.selectedFilters[cat].indexOf(code);
    if (index == -1) {
      this.selectedFilters[cat].push(code);
    } else {
      this.selectedFilters[cat].splice(index, 1);
    }
  }
  openSidenav(item){
    this.service.receiveValue(item);
  }
}
