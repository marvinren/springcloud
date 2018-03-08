import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {mainRouting} from './main.routing';
import {HeaderComponent} from 'app/main/header/header.component';
import {ShareModule} from 'share';
@NgModule({
    declarations: [MainComponent, HeaderComponent],
    imports: [mainRouting, ShareModule]
})
export class MainModule {
}