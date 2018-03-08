import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ng2-webstorage';
import {LoginUser} from 'app/login/login.user';
import {GlobalService} from 'app/global.service';
import {LoginService} from 'app/login/login.service';
import {Alert} from 'share';
import {SysFun} from 'app/system/fun';
@Component({
    selector: 'ai-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    user: LoginUser;
    funTree: SysFun[];
    nav = 'home';


    constructor(private router: Router, private storage: LocalStorageService, private _global: GlobalService, private loginService: LoginService) {
    }

    ngOnInit(): void {
        this._global.user.subscribe(user => {
            this.user = user;
        });
        this._global.userFuns.subscribe(funTree => {
            this.funTree = funTree;
        });
    }
    ngOnDestroy(): void {
    }

    logout() {
        Alert.confirm('退出系统，是否确认？').then(() => {
            let log_id = this.user ? this.user.log_id : null;
            this.clearLoginInfo();
            if (log_id) {
                this.loginService.logout(log_id);
            }
        });
    }
    back() {
        this.nav = 'home';
    }
    clearLoginInfo() {
        this._global.updateUser(null);
        this._global.updateToken(null);
        this.storage.clear('token');
        this.storage.clear('user');
        this.router.navigate([`login`]);
    }
}