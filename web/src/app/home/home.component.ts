import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'app/global.service';
import {ScrollBarConfig} from '../../share/scroll-bar/scroll-bar.interfaces';
import {LoginUser} from 'app/login/login.user';
@Component({
    selector: 'ai-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {

    toggleFlag = true;
    scrollConfig: ScrollBarConfig;

    user: LoginUser = new LoginUser();

    constructor(private router: Router, private globelService: GlobalService, private defaultScrollBarConfig: ScrollBarConfig) {
        this.scrollConfig = defaultScrollBarConfig;
        this.scrollConfig.suppressScrollX = true;
    }

    ngOnInit() {
        this.toggleFlag = true;
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
        this.router.navigate([`pages/home/blank`]);
    }

    toggleBar() {
        this.toggleFlag = !this.toggleFlag;
    }

}