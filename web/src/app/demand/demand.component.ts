import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
@Component({
    selector: 'ai-demand',
    templateUrl: './demand.component.html',
    styleUrls: ['./demand.scss']
})
export class DemandComponent implements OnInit {

    searchBox = {
        demand_name: '',
        demand_number: '',
        demand_creator: '',
        charge: '',
        submit_time_begin: null,
        submit_time_end: null,
        dept: '',
        flow: '',
        step: '',
        type: '',
        system: ''
    };
    searchBoxFlag = false;
    pagination = {
        page_no: 1,
        row_count: 3000,
        page_size: 15
    };

    @Input() operate = false;

    @Output() onOperate = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    onPageChange(page) {
        if (page) {
            this.pagination.page_no = page.page_no;
            this.pagination.page_size = page.page_size;
        }
    }

    onFun(row, operate) {
        this.onOperate.emit({data: row, operate: operate});
    }
}