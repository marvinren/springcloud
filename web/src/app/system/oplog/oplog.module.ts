import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import  {OpLogComponent} from './oplog.component';
import  {OplogServices} from './oplog.services';
import {OpLogTypeComponent} from './type/oplog.type.component';
@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule
    ],
    declarations: [OpLogComponent, OpLogTypeComponent],
    exports: [OpLogComponent],
    providers: [OplogServices]

})
export class OplogModule {

}
