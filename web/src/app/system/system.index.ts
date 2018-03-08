import {Component, OnInit} from '@angular/core';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'app/login/login.user';
@Component({
    selector: 'ai-system-index',
    template: `
        <div class="p-4 v-center center w-100 h-100"><h2>欢迎来到系统管理首页</h2></div>`
})
export class SystemIndexComponent implements OnInit {
    user: LoginUser;

    constructor(private globalService: GlobalService) {

    }

    ngOnInit() {
        this.globalService.user.subscribe(user => {
            this.user = user;
        });
    }
}