import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {OrgService} from './org.service';
import {OrgTreeComponent} from './org.tree.component';
import {OrgEditComponent} from './org.edit.component';
import {OrgComponent} from './org.component';
import {OrgTypeComponent} from './type/org.type.component';
import {OrgtypeService} from 'app/system/orgtype';
import {OrgPipe} from 'app/system/org/org.pipe';
@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule
    ],
    declarations: [OrgComponent, OrgEditComponent, OrgTypeComponent, OrgTreeComponent, OrgPipe],
    exports: [OrgComponent],
    providers: [OrgService, OrgtypeService]

})
export class OrgModule {

}