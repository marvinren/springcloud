import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import {UserService} from 'app/system/user';
import {SelectorOrg} from 'app/system/common/org/selector.org.module';
import {SelectorUser} from 'app/system/common/user/selector.user.module';

@Component({
    selector: 'ai-selector-user-list',
    templateUrl: './selector.user.list.component.html',
    styleUrls: ['./selector.user.list.scss']
})
export class SelectorUserListComponent implements OnInit, DoCheck {
    @Input() checkbox = false;
    @Input() needButton = false;
    @Input() currentOrg = new SelectorOrg();
    @Output() onSubmit = new EventEmitter();
    @Output() onCancel = new EventEmitter();

    list = [];
    currentItem: SelectorUser;
    pagination = {
        organize_id: null,
        keyword: '',
        page_no: 1,
        row_count: 0,
        state: 1,
        page_size: 5
    };

    checkedItems = [];
    checkedItemsMap = new Map<number, SelectorUser>();
    checkedAll = false;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.search();
    }

    ngDoCheck() {
        let org_id = this.currentOrg ? this.currentOrg.organize_id : null;
        if (org_id === this.pagination.organize_id) {
            return;
        }
        if (org_id !== this.pagination.organize_id) {
            this.pagination.organize_id = org_id;
            this.search();
        }
    }

    search() {
        this.pagination.page_no = 1;
        this.onPageChange(null);
    }

    onPageChange(page_no) {
        if (page_no) {
            this.pagination.page_no = page_no;
        }
        this.userService.searchUserPage(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.list = ret.page_data;
                this.pagination.row_count = ret.row_count;
                this.list.forEach(item => {
                    if (this.checkbox && this.checkedItemsMap.has(item.data_role_id)) {
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
        this._onSubmit();
    }

    _onCheck(item) {
        if (item.checked && !this.checkedItemsMap.has(item.data_role_id)) {
            this.checkedItems.push(item);
            this.checkedItemsMap.set(item.data_role_id, item);
        }
        if (!item.checked && this.checkedItemsMap.has(item.station_id)) {
            this.checkedItemsMap.delete(item.data_role_id);
            this.checkedItems.forEach((ci, index) => {
                if (ci.data_role_id === item.data_role_id) {
                    this.checkedItems.splice(0, 1);
                    return;
                }
            });
        }
    }

    _onSubmit() {
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