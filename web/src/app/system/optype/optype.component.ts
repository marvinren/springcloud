import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'app/login/login.user';
import {OptypeService} from './optype.service';
import {Optype} from './optype';
@Component({
    selector: 'ai-system-optype',
    templateUrl: './optype.component.html',
})
export class OptypeComponent implements OnInit {

    user: LoginUser;

    optypeList = [];
    currentItem: Optype;
    rightModel = 'hide';
    pagination = {
        keyword: '',
        op_type_name: '',
        page_no: 1,
        row_count: 0,
        page_size: 15
    };

    constructor(private router: Router, private globelService: GlobalService, private optypeService: OptypeService) {
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
            this.pagination.page_no = page.page_no;
            this.pagination.page_size = page.page_size;
        }
        this.optypeService.getOptypePage(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.optypeList = ret.page_data;
                this.pagination.row_count = ret.row_count;
            } else {
                this.optypeList = [];
                this.pagination.row_count = 0;
            }
        });
    }

    add() {
            this.currentItem = new Optype();
            this.currentItem.readonly = false;
            this.rightModel = 'show';
        }

    edit(item) {
        this.currentItem = JSON.parse(JSON.stringify(item));
        this.currentItem.readonly = false;
        this.rightModel = 'show';
    }

    delete(item) {
        this.optypeService.deleteOptype(item.op_type_id).subscribe(ret => {
            if (ret.row_count > 0) {
                toastr.success('删除成功！');
                this.onPageChange(null);
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
        this.onPageChange(null);
        this.closeRight(1);
    }
}