import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  /* private _toogled = new BehaviorSubject<boolean>(true);
  toogled$: Observable<boolean> = this._toogled.asObservable(); */
  constructor() {
    /* this._toogled = new BehaviorSubject<boolean>(true);
    this.toogled$ = this._toogled.asObservable(); */
   }

  ngOnInit() {
  }

  switch() {
    /* this._toogled.next(!this._toogled.getValue()); */
  }
}
