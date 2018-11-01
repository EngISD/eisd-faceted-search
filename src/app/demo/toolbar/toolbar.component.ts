import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'demo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // @ViewChild('searchbar') searchBar: ElementRef;
  // @ViewChild('searchicon') searchIcon: ElementRef; 
  // @ViewChild('input') inputEl: ElementRef;  

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }
  // testF(){
  //   this.renderer.setStyle(this.searchBar.nativeElement, 'background-color', 'rgba(16, 51, 78, 0.6)');
  //   this.renderer.addClass(this.searchIcon.nativeElement, 'test');
  //   this.renderer.setStyle(this.inputEl.nativeElement, 'background-color', 'rgba(16, 51, 78, 0.6)');
  // }
  // testF2(){
  //   this.searchBar.nativeElement.style.backgroundColor = 'white';
  // }

}
