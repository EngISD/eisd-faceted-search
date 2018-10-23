import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  categories = [ 'category 1', 'category 2', 'category 3', 'category 4' ];
  checkboxes = [ 'checkbox 1', 'checkbox 2', 'checkbox 3', 'checkbox 4' ];

  constructor() { }

  ngOnInit() {
  }

  onNgModelChange($event) {
    console.log($event);
  }
}
