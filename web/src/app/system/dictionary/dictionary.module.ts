import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {DictionaryService} from './dictionary.service';
import {DictionaryTreeComponent} from './dictionary.tree.component';
import {DictionaryEditComponent} from './dictionary.edit.component';
import {DictionaryComponent} from './dictionary.component';
@NgModule({
    imports: [
        ShareModule,
        FormsModule
    ],
    declarations: [DictionaryComponent, DictionaryEditComponent, DictionaryTreeComponent],
    exports: [DictionaryComponent],
    providers: [DictionaryService]

})
export class DictionaryModule {

}