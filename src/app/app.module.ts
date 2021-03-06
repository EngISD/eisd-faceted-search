import { HighlightSearch } from './highlight.pipe';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Routes } from './app.routing';

import { ChartsModule } from 'ng2-charts';

// Material Modules
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ScrollDispatchModule, ScrollDispatcher} from '@angular/cdk/scrolling';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxLoadingModule } from 'ngx-loading';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';
import { MatButtonModule, MatListModule, MatFormFieldModule, MatIconModule, MatIconRegistry,  MatExpansionModule, MatSliderModule, MatInputModule, MatCardModule, MatDividerModule, MatSelectModule, MatTooltipModule } from '@angular/material';
// Components
import { AppComponent } from './app.component';
import { ContentListComponent } from './content-list/content-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilteredListComponent } from './filtered-list/filtered-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DemoComponent } from './demo/demo.component';
import { ToolbarComponent } from './demo/toolbar/toolbar.component';
import { DemoSidenavComponent } from './demo/demo-sidenav/demo-sidenav.component';
import { StartpageComponent } from './startpage/startpage.component';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { MatPaginatorIntlIta } from './demo/demo-sidenav/customPaginatorLabels';
import { DialogComponent } from './demo/dialog/dialog.component';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ContentListComponent,
    NavbarComponent,
    FilteredListComponent,
    DemoComponent,
    ToolbarComponent,
    DemoSidenavComponent,
    StartpageComponent,
    FilterPageComponent,
    DialogComponent,
    HighlightSearch
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgPipesModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    RouterModule.forRoot(Routes),
    NgxLoadingModule.forRoot({}),
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
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    ChartsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatTooltipModule,
    MatChipsModule,
    MatBadgeModule,
    PerfectScrollbarModule,
  ],
  entryComponents: [DialogComponent],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlIta
    },
    ScrollDispatcher,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi_used.svg'));
    registerLocaleData(localeIt);
  }
}
