import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {DictModule} from 'app/tools/dict/dict.module';
import {UserOrgComponent} from './user.org.component';
import {UserStationComponent} from './user.station.component';
import {UserComponent} from './user.component';
import {UserListComponent} from './user.list.component';
import {UserEditComponent} from './user.edit.component';
import {UserService} from  './user.service';
import {StationSelectorModule} from 'app/system/common/station';
import {SelectorOrgModule} from 'app/system/common/org/selector.org.module';
import {StationModule} from 'app/system/station';

@NgModule({
    imports: [
        DictModule,
        ShareModule,
        NgbModule,
        FormsModule,
        StationSelectorModule,
        SelectorOrgModule,
        StationModule
    ],
    declarations: [UserComponent, UserListComponent, UserEditComponent, UserOrgComponent, UserStationComponent],
    exports: [UserComponent],
    providers: [UserService]

})
export class UserModule {

}