import { ServiceService } from './../../service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private service: ServiceService) {
   }

  ngOnInit() {
  }
  switch() {
    this.service.setToggledValue(1);
  }
  toHome(){
    location.reload();
  }

}
