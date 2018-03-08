import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {DataRole} from './datarole';
import {DataroleService} from './datarole.service';
import {Organize} from 'app/system/org';
@Component({
    selector: 'ai-system-daterole-list',
    templateUrl: './datarole.list.component.html'
})
export class DataRoleListComponent implements OnInit, DoCheck {

    @Input() currentOrg: Organize = new Organize();
    list: DataRole[] = [];
    pagination = {
        organize_id: null,
        page_no: 1,
        row_count: 0,
        page_size: 15,
        keyword: ''
    };
    currentItem: DataRole;
    rightModel = 'hide';


    constructor(private dataroleService: DataroleService) {

    }

    ngOnInit() {
        this.search();
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
            this.pagination.page_size = page.page_size;
            this.pagination.page_no = page.page_no;
        }
        this.dataroleService.search(this.pagination).subscribe(ret => {
            if (ret && ret.page_data) {
                this.list = ret.page_data;
                this.pagination.row_count = ret.row_count;
            } else {
                this.list = [];
                this.pagination.row_count = 0;
            }
        });
    }

    add() {
        this.currentItem = new DataRole();
        this.currentItem.organize_id = this.currentOrg.organize_id;
        this.rightModel = 'show';
    }

    edit(item) {
        this.currentItem = JSON.parse(JSON.stringify(item));
        this.rightModel = 'show';
    }

    delete(item) {
        if (item && item.data_role_id) {
            this.dataroleService.delete(item.data_role_id).subscribe(ret => {
                if (ret && ret.row_count) {
                    toastr.success('删除成功！');
                    this.pagination.page_no = 1;
                    this.onPageChange(null);
                }
            });
        }
    }


    closeRight(c) {
        this.rightModel = 'hide';
        setTimeout(() => {
            this.currentItem = null;
        }, 500);
    }

    onSubmitSuccess() {
        this.onPageChange(null);
        this.closeRight(0);
    }
}