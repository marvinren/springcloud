import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShareModule} from 'share';
import {StationComponent} from './station.component';
import {StationEditComponent} from './station.edit.component';
import {StationDataroleComponent} from './station.datarole.component';
import {StationWorkflowRoleComponent} from './station.wfrole.component';
import {StationFunComponent} from './station.fun.component';
import {StationService} from './station.service';
import {AuthorizeModule} from 'app/system/common/authorize';
import {StationTypePipe} from './station';
import {StationTypeNumPipe} from './station';

@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule,
        AuthorizeModule,
    ],
    declarations: [StationComponent, StationEditComponent, StationDataroleComponent, StationFunComponent, StationWorkflowRoleComponent, StationTypePipe, StationTypeNumPipe],
    exports: [StationComponent, StationTypePipe],
    providers: [StationService]

})
export class StationModule {

}