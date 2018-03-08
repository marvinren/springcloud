import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'app/login/login.user';
import {OrgtypeService} from './orgtype.service';
import {Orgtype} from './orgtype';
@Component({
    selector: 'ai-system-orgtype',
    templateUrl: './orgtype.component.html',
})
export class OrgtypeComponent implements OnInit {

    user: LoginUser;

    orgtypeList = [];
    currentItem: Orgtype;
    rightModel = 'hide';
    pagination = {
        keyword: '',
        page_no: 1,
        row_count: 0,
        page_size: 15
    };

    constructor(private router: Router, private globelService: GlobalService, private orgtypeService: OrgtypeService) {
    }

    ngOnInit() {
        this.globelService.user.subscribe(user => {
            this.user = user;
            this.onPageChange(null);
        });
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
         this.orgtypeService.getOrgtypePage(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.orgtypeList = ret.page_data;
                this.pagination.row_count = ret.row_count;
            } else {
                this.orgtypeList = [];
                this.pagination.row_count = 0;
            }
        });
    }

    add() {
        this.currentItem = new Orgtype();
        this.currentItem.readonly = false;
        this.rightModel = 'show';
    }

    edit(item) {
        this.currentItem = JSON.parse(JSON.stringify(item));
        this.currentItem.readonly = false;
        this.rightModel = 'show';
    }

    delete(item) {
        this.orgtypeService.deleteOrgtype(item.organize_type_id).subscribe(ret => {
            if (ret.row_count > 0) {
                toastr.success('删除成功！');
            }
            this.search() ;
        });
    }

    closeRight(p) {
        this.rightModel = 'hide';
        setTimeout(() => {
            this.currentItem = null;
        }, 500);
    }

    onSubmitSuccess(state) {
        this.onPageChange(null);
        this.closeRight(1);
    }
}