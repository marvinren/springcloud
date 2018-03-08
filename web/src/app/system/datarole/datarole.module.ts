import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {DataRoleComponent} from './datarole.component';
import {DataRoleListComponent} from './datarole.list.component';
import {DataroleEditComponent} from './datarole.edit.component';
import {DataroleService} from './datarole.service';
import {SelectorOrgModule} from 'app/system/common/org/selector.org.module';


@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule,
        SelectorOrgModule
    ],
    declarations: [
        DataRoleComponent, DataRoleListComponent, DataroleEditComponent
    ],
    exports: [DataRoleComponent],
    providers: [DataroleService]

})
export class DataRoleModule {

}