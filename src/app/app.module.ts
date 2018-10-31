import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Routes } from './app.routing';

// Material Modules
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { ScrollingModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import { MatButtonModule, MatListModule, MatFormFieldModule, MatIconModule, MatExpansionModule, MatSliderModule, MatInputModule } from '@angular/material';
// Components
import { AppComponent } from './app.component';
import { ContentListComponent } from './content-list/content-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilteredListComponent } from './filtered-list/filtered-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ContentListComponent,
    NavbarComponent,
    FilteredListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgPipesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(Routes),
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
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [ScrollDispatcher],
  bootstrap: [AppComponent]
})
export class AppModule { }
