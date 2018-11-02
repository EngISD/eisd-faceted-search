import { ServiceService } from './../../service.service';
import { ToolbarComponent } from './../toolbar/toolbar.component';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './demo-sidenav.component.html',
  styleUrls: ['./demo-sidenav.component.css']
})
export class DemoSidenavComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  mobileQuery1: MediaQueryList;
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
  checkboxes = [1];
  toolbar1: ToolbarComponent;
  /* toogled = true; */
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: ServiceService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery1 = media.matchMedia('(max-width: 450px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mobileQuery1.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    /* this.toolbar1.toogled$.subscribe(res => {
      if (this.toogled != res) {
        this.toogled = res;
        this.sidenav.toggle();
      }
    }) */
    this.service.toggled.subscribe(res => {
      if (res != 2) {
        this.sidenav.toggle();
      }
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
}
