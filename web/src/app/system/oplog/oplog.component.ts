import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'app/global.service';
import {User} from 'app/system/user/user';
import {OplogServices} from './oplog.services';
import {Oplog} from './oplog';
@Component({
    selector: 'ai-system-oplog',
    templateUrl: './oplog.component.html'
})
export class OpLogComponent implements OnInit {
    searchBoxFlag = false;

    oplogList = [];
    currentItem: Oplog = new Oplog();
    rightModel = 'hide';
    pagination = {
        op_type_id: null,
        op_content: '',
        keyword: '',
        start_time: null,
        end_time: null,
        page_no: 1,
        row_count: 0,
        page_size: 15
    };

    constructor(private  oplogservices: OplogServices) {
    }

    ngOnInit() {
        this.search();
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
        if (this.currentItem) {
            this.pagination.op_type_id = this.currentItem.op_type_id;
        }
        this.oplogservices.getoplogPage(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.oplogList = ret.page_data;
                this.pagination.row_count = ret.row_count;
            } else {
                this.oplogList = [];
                this.pagination.row_count = 0;
            }
        });
    }
}