import { ServiceService } from './../../service.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, AfterViewChecked, ViewChildren } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, PageEvent, MatPaginator, MatExpansionPanel } from '@angular/material';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './demo-sidenav.component.html',
  styleUrls: ['./demo-sidenav.component.css']
})
export class DemoSidenavComponent implements OnInit, OnDestroy, AfterViewChecked {

  // Sort variables
  descending = true;
  option: any = 1;
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
  mobileQuery: MediaQueryList;
  mobileQueryWide: MediaQueryList;
  @ViewChild('snav') sidenav: MatSidenav;
  @ViewChild('snav1') sidenav1: MatSidenav;
  // Facet categories
  categories = [
    {id: 'cdc', icon: 'sitemap', value: 'Centro di Costo'},
    {id: 'anno', icon: 'date_range', value: 'Anno'},
    {id: 'cliente', icon: 'account_box', value: 'Cliente'},
    {id: 'soc', icon: 'business', value: 'Azienda'},
    {id: 'rcdc', icon: 'visibility', value: 'Centro di Costo Resp.'},
    {id: 'cp', icon: 'person', value: 'Resp. del Progetto'},
    {id: 'fun', icon: 'person_outline', value: 'Resp. Commerciale'},
    {id: 'l136', icon: 'outlined_flag', value: 'Legge 136'},
    {id: 'tr', icon: 'outlined_flag', value: 'Tipo Ricavo'},
    {id: 'ta', icon: 'outlined_flag', value: 'Tipo Avanzamento'},
    {id: 'lp', icon: 'outlined_flag', value: 'Linea Prodotto'},
    {id: 't8', icon: 'outlined_flag', value: 'Esiste T8 Corrente'}
  ];
  checkboxes = [];
  numMore = [];
  hasMore = [];
  selectedFilters = [];
  chosenFilters = [];
  // Loading animation parameters
  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#006dddee';
  public secondaryColour = '#cccccc01';
  // Chart parameters
  barSelected = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
            beginAtZero: true,
            precision: 0
          }
      }]
    }
  };
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartColors: Array<any> = [
    {
      backgroundColor: '#0278bd8a',
      borderColor: '#0277bd8a',
      pointBackgroundColor: '#0278bd8a',
      pointBorderColor: '#0277bd8a',
      pointHoverBackgroundColor: '#0277bd8a',
      pointHoverBorderColor: '#0277bd8a'
    }
  ];
  public barChartData: any[] = [
    {data: [], label: ''}
  ];
  // Paginator variables
  page: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentPage = 0;
  length = 0;
  pageSize = 50;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100, 200];
  activePageDataChunk = [];
  @ViewChild(CdkVirtualScrollViewport) scroll: CdkVirtualScrollViewport;
  @ViewChildren(MatExpansionPanel) panels: Array<MatExpansionPanel>;
  private _mobileQueryListener: () => void;

  // tslint:disable:max-line-length
  constructor(private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: ServiceService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryWide = media.matchMedia('(max-width: 770px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mobileQueryWide.addListener(this._mobileQueryListener);
    for (let i = 0; i < this.categories.length; i++) {
      this.selectedFilters[this.categories[i].id] = [];
      this.numMore[this.categories[i].id] = 1;
    }
    this.selectedFilters['internalOrder'] = [];
  }
  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.service.searchValue$.subscribe(response => {
      if (response.length !== 0) {
        for (let i = 0; i < this.categories.length; i++) {
          this.selectedFilters[this.categories[i].id] = [];
          this.numMore[this.categories[i].id] = 1;
        }
        this.barSelected = [];
        this.selectedFilters['internalOrder'] = [];
        this.chosenFilters = [];
        const index = this.categories.findIndex(i => i.id === response['cat']);
        if (response['cat'] !== 'internalOrder') {
          const tempObject = {'cat': response['cat'], 'icon': this.categories[index].icon, 'descr': response['descr'], 'code': response['value'] };
          const indexInChosen = this.chosenFilters.findIndex(i => i.code === tempObject.code);
          if (indexInChosen === -1) {
            this.chosenFilters.push(tempObject);
          }
        } else {
          const tempObject = {'cat': response['cat'], 'icon': 'search', 'descr': response['descr'], 'code': response['value'] };
          const indexInChosen = this.chosenFilters.findIndex(i => i.code === tempObject.code);
          if (indexInChosen === -1) {
            this.chosenFilters.push(tempObject);
          }
        }
        this.select(response['value'], response['cat']);
        if (response['cat'] === 'internalOrder' && response['value'] === '') {
          const cleanIndex = this.chosenFilters.findIndex(i => i.code === '');
          if (cleanIndex !== -1) {
            this.chosenFilters.splice(cleanIndex, 1);
          }
        }
      }
      this.onNgModelChange();
    });
  }
  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.mobileQueryWide.removeListener(this._mobileQueryListener);
    this.changeDetectorRef.detach();
  }

  onNgModelChange(override?) {
    this.sortAllResults();
    for (let i = 0; i < this.categories.length; i++) {
      this.refreshChartFacets(i, override);
    }
  }
  refreshChartFacets(i, override?) {
    if (this.panels !== undefined) {
      this.panels['_results'][i + 1].disabled = false;
      if (this.panels['_results'][i + 1].expanded === true) {
        this.service.refreshFacets(this.categories[i].id, this.selectedFilters, this.numMore[this.categories[i].id]).subscribe(res => {
          this.filterCheck(this.categories[i].id, res);
          if ((this.categories[i].id === 'anno') && (override === undefined)) {
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
          if (this.checkboxes[this.categories[i].id].length === 0) {
            this.panels['_results'][i + 1].close();
            this.panels['_results'][i + 1].disabled = true;
          } else {
            this.panels['_results'][i + 1].disabled = false;
          }
        });
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
    this.service.sortAllResults(this.option, e.pageSize, e.pageIndex, this.descending, this.selectedFilters).subscribe(res => {
      this.activePageDataChunk = res['data'];
      this.pageSize = e.pageSize;
      this.scroll.scrollToIndex(0);
      this.loading = false;
    });
  }
  // Paginator functions
  showMore(cat) {
    ++this.numMore[cat];
    this.service.refreshFacets(cat, this.selectedFilters, this.numMore[cat]).subscribe(res => {
      this.filterCheck(cat, res);
    });
  }
  showLess(cat) {
    this.numMore[cat] = 1;
    this.service.refreshFacets(cat, this.selectedFilters).subscribe(res => {
      this.filterCheck(cat, res);
    });
  }
  filterCheck(cat, res) {
    this.checkboxes[cat] = res['facetOptions'];
      this.checkboxes[cat].sort((n1, n2) => {
        if ((this.selectedFilters[cat].indexOf(n1.code) !== -1) && (this.selectedFilters[cat].indexOf(n2.code) === -1)) {
          return -1;
        }
        if ((this.selectedFilters[cat].indexOf(n1.code) === -1) && (this.selectedFilters[cat].indexOf(n2.code) !== -1)) {
          return 1;
        }
        return 0;
      });
      this.hasMore[cat] = res['hasMore'];
  }
  public chartClicked(e: any): void {
    if (e.active.length > 0) {
      const temp = e.active[0]._model.label;
      const index = this.barSelected.findIndex(x => x === e.active[0]._model.label);
      const tempObject = {'cat': 'anno', 'icon': 'date_range', 'descr': temp, 'code': temp };
      const indexInChosen = this.chosenFilters.findIndex(i => i.code === tempObject.code);
      if (indexInChosen === -1) {
        this.chosenFilters.push(tempObject);
      }
      if (index === -1) {
        this.barSelected.push(temp);
        this.selectedFilters['anno'] = this.barSelected;
        this.onNgModelChange(false);
      }
    }
  }
  resetAll() {
    for (let i = 0; i < this.categories.length; i++) {
      this.selectedFilters[this.categories[i].id] = [];
      this.numMore[this.categories[i].id] = 1;
    }
    this.barSelected = [];
    this.chosenFilters = [];
    this.onNgModelChange();
  }
  sortResults() {
    this.descending = !this.descending;
    this.sortAllResults();
  }
  sortAllResults() {
    this.loading = true;
    this.pageIndex = 0;
    this.paginator.pageIndex = 0;
    this.service.sortAllResults(this.option, this.pageSize, 0, this.descending, this.selectedFilters).subscribe(res => {
      this.activePageDataChunk = res['data'];
      this.length = res['count'];
      this.scroll.scrollToIndex(0);
      if (this.panels !== undefined && this.length === 0) {
        for (let i = 1; i < this.panels['_results'].length; i++) {
          this.panels['_results'][i].close();
          this.panels['_results'][i].disabled = true;
        }
      }
      this.loading = false;
    });
  }

  select(code, cat) {
    const index = this.selectedFilters[cat].indexOf(code);
    if (index === -1) {
      this.selectedFilters[cat].push(code);
    } else {
      this.selectedFilters[cat].splice(index, 1);
    }
  }
  moveToChosen(item, icon, cat) {
    const index = this.chosenFilters.findIndex(i => i.code === item.code);
    if (index === -1) {
      this.chosenFilters.push({'cat': cat, 'icon': icon, 'descr' : item.descr, 'code': item.code});
    } else {
      this.chosenFilters.splice(index, 1);
    }
  }
  disableOption(item) {
    const index = this.chosenFilters.findIndex(i => i.code === item.code);
    const indexInSelected = this.selectedFilters[item.cat].indexOf(item.code);
    if (index !== -1) {
      this.chosenFilters.splice(index, 1);
    }
    if (indexInSelected !== -1) {
      this.selectedFilters[item.cat].splice(indexInSelected, 1);
    }
    if (item.cat === 'internalOrder') {
      this.service.setClean(true);
    } else {
      this.service.setClean(false);
    }
  }
  openSidenav(item) {
    this.service.receiveValue(item);
    if (this.mobileQueryWide.matches && this.sidenav.opened) {
      this.sidenav.close();
    }
  }

  toggle() {
    if (this.mobileQuery.matches) {
      this.sidenav1.close();
    }
    if (this.mobileQueryWide.matches && !this.sidenav.opened) {
      this.sidenav1.close();
    }
      this.sidenav.toggle();
  }
  removeBarSelected(item) {
    const index = this.barSelected.findIndex(x => x === item);
    if (index !== -1) {
      this.barSelected.splice(index, 1);
    }
    const tempObject = {'cat': 'anno', 'icon': 'date_range', 'descr': item, 'code': item };
    const indexInChosen = this.chosenFilters.findIndex(i => i.code === tempObject.code);
    if (indexInChosen !== -1) {
      this.chosenFilters.splice(indexInChosen, 1);
    }
    this.selectedFilters['anno'] = this.barSelected;
    this.onNgModelChange(false);
  }
}
