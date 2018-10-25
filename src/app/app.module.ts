import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatListModule, MatFormFieldModule, MatIconModule, MatExpansionModule, MatSliderModule, MatInputModule } from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SidenavComponent } from './sidenav/sidenav.component';
// Material Modules
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { ScrollingModule, ScrollDispatcher } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { ContentListComponent } from './content-list/content-list.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ContentListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgPipesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollDispatchModule,
    ScrollingModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSliderModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatGridListModule,
    MatPaginatorModule,
    MatAutocompleteModule
  ],
  providers: [ScrollDispatcher],
  bootstrap: [AppComponent]
})
export class AppModule { }
