import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() searchText = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  onKeyUp(text: string) {
    this.searchText.emit(text);
  }
}
