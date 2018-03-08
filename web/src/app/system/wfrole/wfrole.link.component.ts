import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'ai-system-wfrole-link',
    templateUrl: './wfrole.link.component.html',
    styleUrls: ['./wfrole.link.scss']
})
export class WorkflwRoleLinkComponent implements OnInit {
    @Output() onCancel = new EventEmitter();
    @Output() onSubmit = new EventEmitter();
    list = [];
    currentItem;
    pagination = {
        process_key: '',
        link_name: ''
    };

    constructor() {
    }

    ngOnInit() {
        this.getAllLinks();
    }

    getAllLinks() {
        // this.list = this.workflowService.getAllLinsLocal();
        if (!this.list || !this.list.length) {
       }
    }

    search() {
        let i = 0;
        for (i = 0; i < this.list.length; i++) {
            let item = this.list[i];
            if (!this.pagination.process_key && !this.pagination.link_name) {
                item.show = true;
                continue;
            }
            let temp_key = false;
            if (!this.pagination.process_key || (this.pagination.process_key && item.process_key === this.pagination.process_key)) {
                temp_key = true;
            }
            let temp_name = false;
            if (!this.pagination.link_name || (this.pagination.link_name && item.vm_task_name.indexOf(this.pagination.link_name) >= 0)) {
                temp_name = true;
            }
            item.show = temp_key && temp_name;
        }
    }

    onSelectProcess(process_key) {
        this.search();
    }

    _onSubmit() {
        if (this.currentItem) {
            this.onSubmit.emit(this.currentItem);
        }
    }

    _onCancel() {
        this.onCancel.emit(0);
    }
}
