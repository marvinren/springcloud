import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TinymceComponent} from './tinymce.component';
import {TinymceService} from './tinymce.service';

@NgModule({
    imports: [CommonModule, NgbModule, FormsModule],
    declarations: [TinymceComponent],
    exports: [TinymceComponent],
    providers: [TinymceService]
})
export class TinymceModule {
}