import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {FunComponent} from './fun.component';
import {FunTreeComponent} from './fun.tree.component';
import {FunEditComponent} from './fun.edit.component';
import {FunTypePipe} from  './fun';
@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        FunComponent, FunTreeComponent, FunEditComponent, FunTypePipe
    ],
    exports: [FunComponent],
    providers: []

})
export class FunModule {

}