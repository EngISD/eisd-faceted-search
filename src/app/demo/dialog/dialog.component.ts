import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

  // close() {
  //     this.dialogRef.close();
  // }
  openSidenav(){
    this.receivedItem = this.service.emitValue();
  }

}
