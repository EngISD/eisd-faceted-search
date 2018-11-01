import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './demo-sidenav.component.html',
  styleUrls: ['./demo-sidenav.component.css']
})
export class DemoSidenavComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  categories = ['One', 'Two', 'Three', 'Four'];
  checkboxes = [1, 2, 3, 4];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
