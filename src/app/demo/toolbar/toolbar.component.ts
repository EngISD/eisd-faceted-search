import { ServiceService } from './../../service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  value: string = '';
  searchColor: string;
  iconColor: string;

  constructor(private service: ServiceService) {
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

}
