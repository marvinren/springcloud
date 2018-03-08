import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {loginRoute} from './login.route';
import {LoginService} from 'app/login/login.service';
import {AppLoginComponent} from './app.login.component';
@NgModule({
    imports: [
        loginRoute,
        FormsModule,
        CommonModule
    ],
    declarations: [
        LoginComponent, AppLoginComponent,
    ],
    providers: [LoginService]
})
export class LoginModule {
}