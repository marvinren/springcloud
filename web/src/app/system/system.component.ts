import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'app/login/login.user';
import {ScrollBarConfig} from '../../share/scroll-bar/scroll-bar.interfaces';
@Component({
    selector: 'ai-system',
    templateUrl: './system.component.html',
    styleUrls: ['system.scss']
})
export class SystemComponent implements OnInit {

    toggleFlag = true;
    scrollConfig: ScrollBarConfig;

    user: LoginUser;

    constructor(private router: Router, private globelService: GlobalService, private defaultScrollBarConfig: ScrollBarConfig) {
        this.scrollConfig = defaultScrollBarConfig;
        this.scrollConfig.suppressScrollX = true;
    }

    ngOnInit() {
        this.toggleFlag = true;
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
    }

    toggleBar() {
        this.toggleFlag = !this.toggleFlag;
    }

}