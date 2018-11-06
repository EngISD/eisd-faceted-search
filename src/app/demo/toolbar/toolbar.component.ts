import { ServiceService } from './../../service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  value: string = '';

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

}
