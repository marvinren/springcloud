import {NgModule} from '@angular/core';
import {ShareModule} from 'share';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {PaginationModule} from '../../share/pagination/pagination.module';
import {DemandComponent} from './demand.component';
import {DemandSubmitComponent} from './demand.submit.component';
import {DemandWaitComponent} from './demand.wait.component';
import {DemandEditAttachComponent} from './edit/demand.edit.attach.component';
import {DemandEditBaseComponent} from './edit/demand.edit.base.component';
import {DemandEditComponent} from './edit/demand.edit.component';
import {DemandEditTemplateContentComponent} from './edit/demand.edit.template.content.component';
import {DemandEditTemplateComponent} from './edit/demand.edit.template.component';
import {DemandAnalysisComponent} from 'app/demand/analysis/demand.analysis.component';
import {DemandViewBaseComponent} from 'app/demand/view/demand.view.base.component';
import {DemandViewAttachComponent} from 'src/app/demand/view/demand.view.attach.component';
import {DemandViewLogComponent} from 'src/app/demand/view/demand.view.log.component';
import {DemandViewTemplateComponent} from 'app/demand/view/demand.view.template.component';
import {DemandSplitComponent} from 'app/demand/split/demand.split.component';
import {DemandAssignComponent} from 'app/demand/assign/demand.assign.component';
import {DemandStepComponent} from 'app/demand/demand.step.component';
import {DemandApproveComponent} from 'app/demand/approve/demand.approve.component';
import {UploadService} from 'app/demand/edit/upload.service';

/* 编辑组件 */
const DemandEditComponents = [DemandEditComponent, DemandEditAttachComponent, DemandEditBaseComponent, DemandEditTemplateComponent, DemandEditTemplateContentComponent];
/* 只读组件 */
const DemandViewComponents = [DemandViewBaseComponent, DemandViewAttachComponent, DemandViewLogComponent, DemandViewTemplateComponent, DemandStepComponent];
/* 流程相关组件 **/
const DemandWorkflowComponents = [DemandApproveComponent, DemandAnalysisComponent, DemandAssignComponent, DemandSplitComponent];
@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule,
        PaginationModule
    ],
    declarations: [DemandComponent, DemandSubmitComponent, ...DemandEditComponents, ...DemandViewComponents, ...DemandWorkflowComponents, DemandWaitComponent],
    providers: [UploadService],
    exports: [DemandComponent, DemandWaitComponent, DemandEditComponent, DemandAnalysisComponent, DemandApproveComponent]
})
export class DemandModule {

}