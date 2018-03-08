import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {WFRole, WorkflowRoleService} from 'app/system/wfrole';
import {EventManager} from 'share';
@Component({
    selector: 'ai-system-wfrole-selector',
    templateUrl: './wfrole.selector.component.html'
})
export class WorkflowRoleSelectorComponent implements OnInit {
    @Input() checkbox = false;
    @Input() needButton = false;
    @Input() selected_station_id;
    @Output() onSubmit = new EventEmitter();
    @Output() onCancel = new EventEmitter();

    list = [];
    currentItem: SelectorWFRole;
    pagination = {
        keyword: '',
        process_key: '',
        selected_station_id: '',
        page_no: 1,
        row_count: 0,
        state: 1,
        page_size: 5
    };

    checkedItems = [];
    checkedItemsMap = new Map<number, SelectorWFRole>();
    checkedAll = false;

    constructor(private workflowRoleService: WorkflowRoleService, private eventManager: EventManager) {
    }

    ngOnInit() {
        this.search();
        if (this.selected_station_id) {
            this.pagination.selected_station_id = this.selected_station_id;
        }
        this.eventManager.subscribe('wfrole-selector-refresh', (event) => {
            if (event.data === this.pagination.selected_station_id) {
                this.search();
            }
        });
    }

    search() {
        this.pagination.page_no = 1;
        this.onPageChange(null);
    }

    onPageChange(page_no) {
        if (page_no) {
            this.pagination.page_no = page_no;
        }
        this.workflowRoleService.search(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.list = ret.page_data;
                this.pagination.row_count = ret.row_count;
                this.list.forEach(item => {
                    if (this.checkbox && this.checkedItemsMap.has(item.wf_role_id)) {
                        item.checked = true;
                    }
                });
            } else {
                this.list = [];
                this.pagination.row_count = 0;
            }
        });
    }

    toggleAll() {
        if (this.list.length) {
            this.list.forEach(item => {
                item.checked = this.checkedAll;
                this._onCheck(item);
            });
        }
    }

    _onSelectItem(item) {
        this.currentItem = item;
        if (this.needButton) {
            return;
        }
        this._onsubmit();
    }

    _onCheck(item) {
        if (item.checked && !this.checkedItemsMap.has(item.wf_role_id)) {
            this.checkedItems.push(item);
            this.checkedItemsMap.set(item.wf_role_id, item);
        }
        if (!item.checked && this.checkedItemsMap.has(item.wf_role_id)) {
            this.checkedItemsMap.delete(item.wf_role_id);
            this.checkedItems.forEach((ci, index) => {
                if (ci.wf_role_id === item.wf_role_id) {
                    this.checkedItems.splice(0, 1);
                    return;
                }
            });
        }
    }

    _onsubmit() {
        if (this.checkbox) {
            this.onSubmit.emit(this.checkedItems);
        } else {
            this.onSubmit.emit(this.currentItem);
        }
    }

    _onCancel() {
        this.onCancel.emit(1);
    }

}
export class SelectorWFRole extends WFRole {
    checked: boolean;
}