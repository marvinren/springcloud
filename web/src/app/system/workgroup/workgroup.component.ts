import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'app/login/login.user';
import {WorkgroupService} from './workgroup.service';
import {Workgroup} from './workgroup';
@Component({
    selector: 'ai-system-workgroup',
    templateUrl: './workgroup.component.html',
})
export class WorkgroupComponent implements OnInit {

    user: LoginUser;
    workgroup; Workgroup = new Workgroup();
    workgroupList = [];
    currentItem: Workgroup;
    rightModel = 'hide';
    pagination = {
        keyword: '',
        work_group_name: '',
        code: '',
        page_no: 1,
        row_count: 0,
        page_size: 15
    };

    constructor(private router: Router, private globelService: GlobalService, private workgroupService: WorkgroupService) {
    }

    search() {
        this.pagination.page_no = 1;
        this.onPageChange(null);
    }

    ngOnInit() {
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
        this.search();
    }

    onPageChange(page) {
        if (page) {
            this.pagination.page_size = page.page_size;
            this.pagination.page_no = page.page_no;
        }
        this.workgroupService.getWorkgroupPage(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.workgroupList = ret.page_data;
                this.pagination.row_count = ret.row_count;
            } else {
                this.workgroupList = [];
                this.pagination.row_count = 0;
            }
        });
    }

    add() {
        this.currentItem = new Workgroup();
        this.currentItem.readonly = false;
        this.rightModel = 'show';
    }

    edit(item) {
        this.currentItem = JSON.parse(JSON.stringify(item));
        this.currentItem.readonly = false;
        this.rightModel = 'show';
    }

    delete(item) {
        this.workgroupService.deleteWorkgroup(item.work_group_id).subscribe(ret => {
            if (ret.row_count > 0) {
                toastr.success('删除成功！');
                this.search();
            }
        });
    }

    closeRight(p) {
        this.rightModel = 'hide';
        setTimeout(() => {
            this.currentItem = null;
        }, 500); // 因为滑窗动画有500ms，所以延迟500ms再置空被选中项
    }

    onSubmitSuccess(state) {
        this.search();
        this.closeRight(1);
    }
}