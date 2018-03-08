import {Organize} from 'app/system/org';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
@Component({
    selector: 'ai-system-user-org',
    templateUrl: './user.org.component.html'
})
export class UserOrgComponent implements OnInit {
    @Input() user: User = new User();
    @ViewChild('orgDrop') orgDrop;
    userOrg;


    constructor(private userService: UserService) {

    }

    ngOnInit() {
        this.getUserOrg();
    }

    getUserOrg() {
        this.userService.getUserOrg(this.user.staff_id).subscribe(ret => {
            if (ret) {
                this.userOrg = ret;
            }
        });
    }

    delete(item) {
        this.userService.deleteUserOrg(item.staff_org_relat_id).subscribe(ret => {
            if (ret && ret.row_count) {
                this.userOrg = null;
                toastr.success('删除成功！');
            }
        });
    }

    openOrgDrop() {
        this.orgDrop.open();
    }

    closeOrgDrop() {
        this.orgDrop.close();
    }

    addUserOrg(org) {
        this.closeOrgDrop();
        this.userService.addUserOrg(this.user, org).subscribe(ret => {
             this.getUserOrg();
            org.staff_org_relat_id = ret.staff_org_relat_id;
            this.userOrg = org;
        });
    }
}