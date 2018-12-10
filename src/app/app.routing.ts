import { FilterPageComponent } from './filter-page/filter-page.component';
import { DemoComponent } from './demo/demo.component';
import { StartpageComponent } from './startpage/startpage.component';

export const Routes = [
    { path: '', component: DemoComponent },
    { path: 'filter', component: FilterPageComponent},
    { path: 'demo', component: DemoComponent}
];
