import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {DictCheckboxComponent} from './dict.checkbox.component';
import {DictSelectComponent} from './dict.select.component';
import {DictDescComponent} from './dict.desc.component';
import {DictionaryService} from 'app/system/dictionary';
import {LoadingModule} from 'app/tools/loading/loading.module';
@NgModule({
    imports: [CommonModule, NgbModule, FormsModule, LoadingModule],
    declarations: [DictCheckboxComponent, DictSelectComponent, DictDescComponent],
    exports: [DictCheckboxComponent, DictSelectComponent, DictDescComponent],
    providers: [DictionaryService]
})
export class DictModule {

}