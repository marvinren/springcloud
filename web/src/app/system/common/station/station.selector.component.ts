import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Station, StationService} from 'app/system/station';
import {EventManager} from 'share';

@Component({
    selector: 'ai-system-station-selector',
    templateUrl: './station.selector.component.html',
    styleUrls: ['./station.selector.scss']
})
export class StationSelectorComponent implements OnInit {
    @Input() checkbox = false; // true为多选
    @Input() needButton = false; // true为显示确定按钮，选中后点击确认才返回选中项
    @Input() selected_staff_id; // 需要过滤的用户id
    @Output() onSubmit = new EventEmitter();
    @Output() onCancel = new EventEmitter();

    stationList = [];
    currentItem: SelectorStation;
    pagination = {
        keyword: '',
        selected_staff_id: null,
        page_no: 1,
        row_count: 0,
        page_size: 15
    };

    checkedItems = [];
    checkedItemsMap = new Map<number, SelectorStation>();
    checkedAll = false;

    constructor(private stationService: StationService, private eventManager: EventManager) {
    }

    ngOnInit() {
        this.pagination.selected_staff_id = this.selected_staff_id;
        this.search();
        this.eventManager.subscribe('station-selector-refresh', (event) => {
            if (event.data === this.pagination.selected_staff_id) {
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
        this.stationService.getStationsPage(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.stationList = ret.page_data;
                this.pagination.row_count = ret.row_count;
                this.stationList.forEach(item => {
                    if (this.checkbox && this.checkedItemsMap.has(item.station_id)) {
                        item.checked = true;
                    }
                });
            } else {
                this.stationList = [];
                this.pagination.row_count = 0;
            }
        });
    }

    toggleAll() {
        if (this.stationList.length) {
            this.stationList.forEach(item => {
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
        if (item.checked && !this.checkedItemsMap.has(item.station_id)) {
            this.checkedItems.push(item);
            this.checkedItemsMap.set(item.station_id, item);
        }
        if (!item.checked && this.checkedItemsMap.has(item.station_id)) {
            this.checkedItemsMap.delete(item.station_id);
            this.checkedItems.forEach((ci, index) => {
                if (ci.station_id === item.station_id) {
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
export class SelectorStation extends Station {
    checked: boolean;
}