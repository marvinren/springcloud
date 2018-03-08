import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SelectorOrgComponent} from './selector.org.component';
import {SelectorOrgTreeComponent} from './selector.org.tree.component';
import {Organize, OrgService} from 'app/system/org';
import {ScrollBarModule} from '../../../../share/scroll-bar/scroll-bar.module';
import {OrgtypeService} from 'app/system/orgtype';
@NgModule({
    imports: [CommonModule, NgbModule, FormsModule, ScrollBarModule],
    declarations: [SelectorOrgComponent, SelectorOrgTreeComponent],
    exports: [SelectorOrgComponent],
    providers: [OrgService]
})
export class SelectorOrgModule {
}

export class SelectorOrg extends Organize {
    checked: boolean;
}