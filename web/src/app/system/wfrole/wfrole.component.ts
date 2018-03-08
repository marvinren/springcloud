import {Component} from '@angular/core';
import {WFRole} from 'app/system/wfrole';
import {WorkflowRoleService} from './wfrole.service';
@Component({
    selector: 'ai-system-wfrole',
    templateUrl: './wfrole.component.html',
    styleUrls: ['./wfrole.scss']
})
export class WorkflowRoleComponent {

    list: WFRole[] = [];

    pagination = {
        keyword: '',
        process_key: '',
        page_no: 1,
        row_count: 0,
        page_size: 15
    };
    currentItem: WFRole;
    rightModel = 'hide';

    constructor(private workflowRoleService: WorkflowRoleService) {
        this.search();
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
        this.workflowRoleService.search(this.pagination).subscribe(ret => {
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
        this.currentItem = new WFRole();
        this.rightModel = 'show';
    }

    edit(item) {
        this.currentItem = JSON.parse(JSON.stringify(item));
        this.rightModel = 'show';

    }

    delete(item) {

        if (item && item.wf_role_id) {
            this.workflowRoleService.delete(item.wf_role_id).subscribe(ret => {
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