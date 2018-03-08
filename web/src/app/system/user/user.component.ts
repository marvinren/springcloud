import {Component, OnInit} from '@angular/core';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'src/app/login/login.user';
import {Organize} from 'app/system/org';
@Component({
    selector: 'ai-system-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.scss']
})
export class UserComponent implements OnInit {

    user: LoginUser;
    currentOrg: Organize = new Organize();

    constructor(private globelService: GlobalService) {
    }

    ngOnInit() {
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
    }

    onSelectOrg(org) {
        this.currentOrg = org;
    }
}