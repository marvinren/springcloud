import {RouterModule} from '@angular/router';
import {SystemComponent} from 'app/system/system.component';
import {SystemOplogComponent} from './system.oplog.component';
import {SystemStationComponent} from './system.station.component';
import {SystemOptypeComponent} from './system.optype.component';
import {SystemWorkgroupComponent} from './system.workgroup.component';
import {SystemDataroleComponent} from './system.datarole.component';
import {SystemFunComponent} from './system.fun.component';
import {SystemWfroleComponent} from './system.wfrole.component';
import {SystemOrgtypeComponent} from './system.orgtype.component';
import {SystemOrgComponent} from './system.org.component';
import {SystemUserComponent} from './system.user.component';
import {SystemIndexComponent} from './system.index';
import {SystemDictionaryComponent} from './system.dictionary.component';


export const systemRouting = RouterModule.forChild([{
    path: '',
    component: SystemComponent,
    children: [
        {path: '', pathMatch: 'full', redirectTo: 'index'},
        {path: 'index', component: SystemIndexComponent},
        {path: 'user/search/:t', component: SystemUserComponent},
        {path: 'org/search/:t', component: SystemOrgComponent},
        {path: 'station/search/:t', component: SystemStationComponent},
        {path: 'optype/search/:t', component: SystemOptypeComponent},
        {path: 'workgroup/search/:t', component: SystemWorkgroupComponent},
        {path: 'fun/search/:t', component: SystemFunComponent},
        {path: 'wfrole/search/:t', component: SystemWfroleComponent},
        {path: 'datarole/search/:t', component: SystemDataroleComponent},
        {path: 'orgtype/search/:t', component: SystemOrgtypeComponent},
        {path: 'oplog/search/:t', component: SystemOplogComponent},
        {path: 'dictionary/search/:t', component: SystemDictionaryComponent},
    ]
}]);