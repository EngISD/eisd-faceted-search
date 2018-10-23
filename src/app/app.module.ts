import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatListModule, MatFormFieldModule, MatIconModule, MatExpansionModule, MatSliderModule, MatInputModule } from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';

import { SidenavComponent } from './sidenav/sidenav.component';
// Material Modules
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { ContentListComponent } from './content-list/content-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ContentListComponent
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
    MatFormFieldModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
