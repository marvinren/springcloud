import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {OrgtypeComponent} from './orgtype.component';
import {OrgtypeEditComponent} from './orgtype.edit.component';
import {OrgtypeService} from './orgtype.service';



@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        OrgtypeComponent, OrgtypeEditComponent
    ],
    exports: [OrgtypeComponent],
    providers: [OrgtypeService]

})
export class OrgtypeModule {

}