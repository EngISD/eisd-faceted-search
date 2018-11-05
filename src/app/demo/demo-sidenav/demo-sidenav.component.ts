import { ServiceService } from './../../service.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
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
export class DemoSidenavComponent implements OnInit, OnDestroy {

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
    {id: 'l136', icon: 'contact_support'},
    {id: 'ta', icon: 'contact_support'},
    {id: 'lp', icon: 'contact_support'},
    {id: 't8', icon: 'contact_support'}
  ];
  content = [];
  checkboxes = [1];

  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = 'rgb(217, 0, 80)';
  public secondaryColour = 'rgb(0, 47, 90)';

  page: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentPage = 0;
  length = 0;
  pageSize = 50;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  activePageDataChunk = [];

  @ViewChild(CdkVirtualScrollViewport) scroll: CdkVirtualScrollViewport;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: ServiceService, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.loading = true;
    this.service.toggled.subscribe(res => {
      if (res != 2) {
        this.sidenav.toggle();
      }
    });
    this.service.getCountOfAll().subscribe(res => {
      this.length = res;
    });
    this.service.getRealData(this.pageSize, 0).subscribe(res => {
      this.content = res;
      this.activePageDataChunk = this.content;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onNgModelChange(e) {
    console.log(e);
  }

  trackByFn(index, item) {
    return index;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    this.loading = true;
    this.service.getRealData(e.pageSize, e.pageIndex).subscribe(res => {
      this.content = res;
      this.pageSize = e.pageSize;
      const firstCut = e.pageIndex * e.pageSize;
      const secondCut = firstCut + e.pageSize;
      this.scroll.scrollToIndex(0); // Returns the scroll to top when page changes
      this.activePageDataChunk = this.content;
      this.loading = false;
    });
  }

  showMore(cat) {
    console.log('Clicked show more');
  }

  openDialog(item){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = item;
    if (this.mobileQuery.matches) {
      dialogConfig.height = '100%';
      dialogConfig.width = '100%';
      dialogConfig.hasBackdrop = false;
      dialogConfig.maxWidth = '100%'
    } else {
      dialogConfig.height = '600px';
      dialogConfig.width = '800px';
    }
    this.dialog.open(DialogComponent, dialogConfig);

    
    

    
  }

}
