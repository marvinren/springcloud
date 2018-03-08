import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {WorkgroupService} from './workgroup.service';
import {Workgroup} from './workgroup';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'src/app/login/login.user';

@Component({
    selector: 'ai-system-workgroup-user',
    templateUrl: './workgroup.user.component.html'
})
export class WorkgroupUserComponent implements OnInit {

    @Input() workgroup = new Workgroup();
    @ViewChild('dropDrop') dropDrop;

    user = new LoginUser();

    list = [];
    pagination = {
        keyword: '',
        work_group_id: null,
        page_no: 1,
        row_count: 0,
        page_size: 10
    };

    constructor(private workgroupService: WorkgroupService, private _global: GlobalService) {
    }

    ngOnInit() {
        this._global.user.subscribe(user => {
            this.user = user;
        });
        this.pagination.work_group_id = this.workgroup.work_group_id;
        this.onPageChange(null);
    }

    onPageChange(page) {
        if (page) {
            this.pagination.page_no = page.page_no;
            this.pagination.page_size = page.page_size;
        }
        this.workgroupService.searchWorkgroupUserPage(this.pagination).subscribe(ret => {
            if (ret && ret.page_data) {
                this.list = ret.page_data;
                this.pagination.row_count = ret.row_count;
            } else {
                this.list = [];
                this.pagination.row_count = 0;
            }
        });
    }

    openDrop() {
        this.dropDrop.open();
    }

    closeDrop() {
        this.dropDrop.close();
    }

    add(item) {
        this.closeDrop();
        let data = {
            work_group_name: this.workgroup.work_group_name,
            work_group_id: this.workgroup.work_group_id,
            staff_id: item.staff_id,
            code: item.code,
            data_role_id: item.data_role_id,
            op_id: this.user ? this.user.staff_id : 1,
            operate_type: 'C',
        };
        this.workgroupService.addWorkgroupUser(data).subscribe(ret => {
            this.pagination.page_no = 1;
            this.onPageChange(null);
        });
    }
    delete(item) {
        this.workgroupService.deleteWorkgroupUser(item).subscribe(ret => {
            this.pagination.page_no = 1;
            this.onPageChange(null);
        });
    }

}