import {Component, OnInit, Input, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'app/login/login.user';
import {UserService} from './user.service';
import {OrgService, Organize} from 'app/system/org';
import {User} from './user';
@Component({
    selector: 'ai-system-user-list',
    templateUrl: './user.list.component.html',
    styleUrls: ['./user.list.scss']
})
export class UserListComponent implements OnInit, DoCheck {

    user: LoginUser;
    userList: User[] = [];
    searchBoxFlag = false;
    pagination = {
        keyword: '',
        bill_id: '',
        organize_id: null,
        page_no: 1,
        row_count: 0,
        page_size: 15
    };
    @Input() currentOrg: Organize = new Organize();
    currentItem: User;
    rightModel = 'hide';

    constructor(private router: Router, private globelService: GlobalService, private userService: UserService, private orgService: OrgService) {
    }

    ngOnInit() {
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
    }

    ngDoCheck() {
        let org_id = this.currentOrg ? this.currentOrg.organize_id : null;
        if (org_id !== this.pagination.organize_id) {
            this.pagination.organize_id = org_id;
            this.search();
        }
    }

    search() {
        this.pagination.page_no = 1;
        this.onPageChange(null);
    }

    onPageChange(page) {
        if (page) {
            this.pagination.page_no = page.page_no;
            this.pagination.page_size = page.page_size;
        }
        this.userService.searchUserPage(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.userList = ret.page_data;
                this.pagination.row_count = ret.row_count;
            } else {
                this.userList = [];
                this.pagination.row_count = 0;
            }
        });
    }

    editUser(user) {
        this.currentItem = JSON.parse(JSON.stringify(user));
        this.rightModel = 'show';
    }

    deleteUser(user) {
        if (user && user.staff_id) {
            this.userService.deleteUser(user.staff_id).subscribe(ret => {
                if (ret && ret.row_count) {
                    toastr.success('删除用户成功！');
                    this.pagination.page_no = 1;
                    this.onPageChange(null);
                }
            });
        }
    }

    addUser() {
        this.currentItem = new User();
        this.currentItem.organize_id = this.currentOrg.organize_id;
        this.rightModel = 'show';
    }


    closeRight(c) {
        this.rightModel = 'hide';
        setTimeout(() => {
            this.currentItem = null;
        }, 500);
    }

    onSubmitSuccess() {
        this.onPageChange(null);
    }
}