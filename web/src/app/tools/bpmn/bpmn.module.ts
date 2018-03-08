import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {BpmnComponent} from 'app/tools/bpmn/bpmn.component';
import {ShareModule} from 'share';
@NgModule({
    imports: [ShareModule, FormsModule],
    declarations: [BpmnComponent],
    exports: [BpmnComponent],
    providers: []
})
export class BpmnModule {

}