import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SelectorUserListComponent} from './selector.user.list.component';
import {SelectorUserComponent} from './selector.user.component';
import {User, UserService} from 'app/system/user';
import {ScrollBarModule} from '../../../../share/scroll-bar/scroll-bar.module';
import {SelectorOrgModule} from 'app/system/common/org/selector.org.module';
@NgModule({
    imports: [CommonModule, NgbModule, FormsModule, ScrollBarModule, SelectorOrgModule],
    declarations: [SelectorUserComponent, SelectorUserListComponent],
    exports: [SelectorUserComponent],
    providers: [UserService]
})
export class SelectorUserModule {
}
export class SelectorUser extends User {
    checked: boolean;
}