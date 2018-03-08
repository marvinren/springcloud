import {Component, OnInit} from '@angular/core';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'app/login/login.user';
import {Router} from '@angular/router';
@Component({
    selector: 'ai-system-siderbar',
    templateUrl: './system.siderbar.component.html',
    styleUrls: ['system.siderbar.scss']
})
export class SystemSiderbarComponent implements OnInit {

    user: LoginUser = new LoginUser();
    funTree;
    currentMenu;

    constructor(private router: Router, private globelService: GlobalService) {

    }

    ngOnInit() {
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
        this.globelService.userFunsMap.subscribe(map => {
            this.funTree = map.get('system');
        });
    }

    linkTo(item, needTime) {
        if (!item) {
            return;
        }
        this.currentMenu = item;
        if (!item.view_path) {
            item.opened = !item.opened;
            return;
        }
        if (needTime) {
            this.router.navigate([`${item.view_path}/${new Date().getTime()}`]);
        } else {
            this.router.navigate([`${item.view_path}`]);
        }
    }
}