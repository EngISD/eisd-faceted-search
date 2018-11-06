import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // Clears input value
  value: string = '';
  // Change searchbar colors
  searchColor: string;
  iconColor: string;

  constructor() {
   }

  ngOnInit() {
  }

  toHome(){
    location.reload();
  }
  cleanValue(){
    this.value = '';
  }
  onFocus(){
    this.searchColor = 'white';
    this.iconColor = 'rgb(2, 119, 189)';
  }
  onFocusOut(){
    this.searchColor = 'rgb(2, 107, 170)';
    this.iconColor = 'white';
  }
  // Triggers autocomplete after 2nd letter
  trigger(value: string) {
    if (value.length > 2) {
      return true;
    }
  }

}
