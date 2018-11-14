import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private service: ServiceService) {
  }

  receivedItem: any;

  ngOnInit() {
  }
  ngAfterContentChecked(): void {
    this.receivedItem = this.service.itemValue$;
  }
}
