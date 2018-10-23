import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPipesModule } from 'ngx-pipes';
import { MatButtonModule, MatListModule, MatFormFieldModule, MatIconModule, MatExpansionModule, MatSliderModule, MatInputModule } from '@angular/material';
=======
import { NgPipesModule } from 'ngx-pipes';
>>>>>>> 0b385d9284792a703a38655a2236b26003697e44

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgPipesModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSliderModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
