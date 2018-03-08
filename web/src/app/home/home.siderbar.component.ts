import {Component, OnInit} from '@angular/core';
import {GlobalService} from 'app/global.service';
import {Router} from '@angular/router';
import {LoginUser} from 'app/login/login.user';
@Component({
    selector: 'ai-home-siderbar',
    templateUrl: './home.siderbar.component.html',
    styleUrls: ['home.siderbar.scss']
})
export class HomeSiderbarComponent implements OnInit {

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
            this.funTree = map.get('home');
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