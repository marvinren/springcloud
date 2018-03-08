import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StationService} from './station.service';
import {Station} from './station';
import {DataRole} from '../datarole';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'src/app/login/login.user';

@Component({
    selector: 'ai-system-station-datarole',
    templateUrl: './station.datarole.component.html'
})
export class StationDataroleComponent implements OnInit {

    @Input() station = new Station();
    @ViewChild('dropDrop') dropDrop;

    user = new LoginUser();

    list = [];
    pagination = {
        keyword: '',
        station_id: null,
        page_no: 1,
        row_count: 0,
        page_size: 10
    };

    constructor(private stationService: StationService, private _global: GlobalService) {
    }

    ngOnInit() {
        this._global.user.subscribe(user => {
            this.user = user;
        });
        this.pagination.station_id = this.station.station_id;
        this.onPageChange(null);
    }

    onPageChange(page) {
        if (page) {
            this.pagination.page_no = page.page_no;
            this.pagination.page_size = page.page_size;
        }
        this.stationService.searchStationDatarolePage(this.pagination).subscribe(ret => {
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
            station_id: this.station.station_id,
            data_role_id: item.data_role_id,
            op_id: this.user ? this.user.staff_id : 1,
            operate_type: 'C',
        };
        this.stationService.addStationDatarole(data).subscribe(ret => {
            this.onPageChange(null);
        });
    }
    delete(item) {
        this.stationService.deleteStationDatarole(item).subscribe(ret => {
            this.onPageChange(null);
        });
    }

}