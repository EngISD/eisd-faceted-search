import { FilteredListComponent } from "./filtered-list/filtered-list.component";
import { ContentListComponent } from "./content-list/content-list.component";

export const Routes = [
    { path: '', component: ContentListComponent },
    { path: 'filter', component: FilteredListComponent}
];
