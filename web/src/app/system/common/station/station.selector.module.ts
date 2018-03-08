import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {StationModule} from 'app/system/station';
import {StationSelectorComponent} from './station.selector.component';
import {StationSelectorTypePipe} from './station.selector.pipe';


@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule,
        StationModule
    ],
    declarations: [
        StationSelectorComponent, StationSelectorTypePipe
    ],
    exports: [StationSelectorComponent],
    providers: []

})
export class StationSelectorModule {

}