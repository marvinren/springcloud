import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {WorkgroupComponent} from './workgroup.component';
import {WorkgroupEditComponent} from './workgroup.edit.component';
import {WorkgroupService} from './workgroup.service';
import {WorkgroupUserComponent} from './workgroup.user.component';
import {SelectorUserModule} from 'app/system/common/user/selector.user.module';


@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule,
        SelectorUserModule
    ],
    declarations: [WorkgroupComponent, WorkgroupEditComponent, WorkgroupUserComponent],
    exports: [WorkgroupComponent],
    providers: [WorkgroupService]

})
export class WorkgroupModule {

}