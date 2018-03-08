import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ShareModule} from 'share';
import {NgbDatepickerI18n, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IslamicCivilI18n} from '../../core/providers/date.datepickerI18n';
import {systemRouting} from './system.route';
import {SystemComponent} from './system.component';
import {SystemSiderbarComponent} from './system.siderbar.component';
import {SystemIndexComponent} from './system.index';

import {StationModule} from './station';
import {OptypeModule} from './optype';
import {UserModule} from './user';
import {OrgModule} from './org';
import {WorkgroupModule} from './workgroup';
import {OrgtypeModule} from './orgtype';
import {FunModule} from './fun';
import {WfRoleModule} from './wfrole';
import {DataRoleModule} from './datarole';
import {OplogModule} from './oplog' ;
import {DictionaryModule} from './dictionary';

import {SystemOplogComponent} from './system.oplog.component';
import {SystemStationComponent} from './system.station.component';
import {SystemOptypeComponent} from './system.optype.component';
import {SystemWorkgroupComponent} from './system.workgroup.component';
import {SystemDataroleComponent} from './system.datarole.component';
import {SystemOrgtypeComponent} from './system.orgtype.component';
import {SystemFunComponent} from './system.fun.component';
import {SystemWfroleComponent} from './system.wfrole.component';
import {SystemOrgComponent} from './system.org.component';
import {SystemUserComponent} from './system.user.component';
import {SystemDictionaryComponent} from './system.dictionary.component';

@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule,
        StationModule,
        OptypeModule,
        WorkgroupModule,
        DataRoleModule,
        OrgtypeModule,
        FunModule,
        WfRoleModule,
        OrgModule,
        UserModule,
        OplogModule,
        DictionaryModule,
        systemRouting
    ],
    declarations: [
        SystemComponent, SystemSiderbarComponent, SystemIndexComponent, SystemOrgComponent, SystemUserComponent, SystemStationComponent, SystemDataroleComponent, SystemFunComponent, SystemWfroleComponent,
        SystemOptypeComponent, SystemOrgtypeComponent, SystemWorkgroupComponent, SystemOplogComponent, SystemDictionaryComponent],
    providers: []
})

export class SystemModule {

}
