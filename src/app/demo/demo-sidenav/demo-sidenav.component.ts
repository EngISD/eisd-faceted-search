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
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  categories = ['One', 'Two', 'Three', 'Four'];
  checkboxes = [1, 2, 3, 4];
  toolbar1: ToolbarComponent;
  /* toogled = true; */
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    /* this.toolbar1.toogled$.subscribe(res => {
      if (this.toogled != res) {
        this.toogled = res;
        this.sidenav.toggle();
      }
    }) */
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
