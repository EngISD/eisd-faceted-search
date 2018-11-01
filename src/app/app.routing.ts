import { Component } from '@angular/core';
import { FilteredListComponent } from "./filtered-list/filtered-list.component";
import { ContentListComponent } from "./content-list/content-list.component";
import { DemoComponent } from './demo/demo.component';

export const Routes = [
    { path: '', component: ContentListComponent },
    { path: 'filter', component: FilteredListComponent},
    { path: 'demo', component: DemoComponent}
];
