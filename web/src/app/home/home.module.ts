import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {homeRouting} from './home.route';
import {HomeSiderbarComponent} from './home.siderbar.component';
import {HomeBlankComponent} from './home.blank.component';
import {HomeComponent} from './home.component';
import {ShareModule} from 'share';
// import {VersionPublishModule} from 'app/workflow/verpublish/verpublish.module';



let orderComponent = [];

@NgModule({
    imports: [
        ShareModule,
        NgbModule,
        FormsModule,
        homeRouting,
        // VersionPublishModule,
    ],
    declarations: [
        HomeComponent, HomeSiderbarComponent, HomeBlankComponent,
        ...[orderComponent]
    ],
    providers: []
})
export class HomeModule {

}