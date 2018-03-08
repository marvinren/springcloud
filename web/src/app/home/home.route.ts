import {RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {HomeBlankComponent} from './home.blank.component';
export const homeRouting = RouterModule.forChild([
    {
        path: '',
        component: HomeComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'blank'},
            {path: 'blank', component: HomeBlankComponent},
        ]
    }
]);