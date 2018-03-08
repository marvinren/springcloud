import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataroleSelectorComponent} from './datarole.selector.component';
import {DataroleSelectorListComponent} from './datarole.selector.list.component';
import {FunSelectorComponent} from './fun.selector.component';
import {FunSelectorTreeComponent} from './fun.selector.tree.component';
import {WorkflowRoleSelectorComponent} from './wfrole.selector.component';
import {CommonModule} from '@angular/common';
import {ScrollBarModule} from '../../../../share/scroll-bar/scroll-bar.module';
import {AuthroizeOrgComponent} from './authroize.org.component';
import {AuthorizOrgTreeComponent} from 'app/system/common/authorize/authorize.org.tree.component';


@NgModule({
    imports: [
        CommonModule, NgbModule, FormsModule, ScrollBarModule
    ],
    declarations: [
        DataroleSelectorComponent, DataroleSelectorListComponent, AuthroizeOrgComponent, AuthorizOrgTreeComponent,
        FunSelectorComponent, FunSelectorTreeComponent, WorkflowRoleSelectorComponent
    ],
    exports: [DataroleSelectorComponent, FunSelectorComponent, WorkflowRoleSelectorComponent],
    providers: []

})
export class AuthorizeModule {

}