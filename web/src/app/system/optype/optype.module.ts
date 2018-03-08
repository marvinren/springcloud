import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {OptypeComponent} from './optype.component';
import {OptypeEditComponent} from './optype.edit.component';
import {OptypeService} from './optype.service';

@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule
    ],
    declarations: [OptypeComponent, OptypeEditComponent],
    exports: [OptypeComponent],
    providers: [OptypeService]

})
export class OptypeModule {

}