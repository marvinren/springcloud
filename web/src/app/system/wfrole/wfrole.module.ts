import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {WorkflowRoleService} from './wfrole.service';
import {WorkflowRoleComponent} from './wfrole.component';
import {WorkflowRoleEditComponent} from './wfrole.edit.component';
import {WorkflwRoleLinkComponent} from './wfrole.link.component';

@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule,
    ],
    declarations: [WorkflowRoleComponent, WorkflowRoleEditComponent, WorkflwRoleLinkComponent],
    exports: [WorkflowRoleComponent],
    providers: [WorkflowRoleService]
})
export class WfRoleModule {

}