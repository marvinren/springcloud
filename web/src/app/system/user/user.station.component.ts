import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {GlobalService} from 'app/global.service';
import {EventManager} from 'share';
@Component({
    selector: 'ai-system-user-station',
    templateUrl: './user.station.component.html'
})
export class UserStationComponent implements OnInit {
    @Input() user: User = new User();
    @ViewChild('dropDrop') dropDrop;
    stationList = [];

    pagination = {
        staff_id: null,
        page_no: 1,
        row_count: 0,
        page_size: 15
    };

    constructor(private userService: UserService, private globelService: GlobalService, private eventManager: EventManager) {

    }

    ngOnInit() {
        this.pagination.staff_id = this.user.staff_id;
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
        this.userService.getUserStationsPage(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.stationList = ret.page_data;
                this.pagination.row_count = ret.row_count;
            } else {
                this.stationList = [];
                this.pagination.row_count = 0;
            }
        });
    }

    delete(item) {
        this.userService.deleteUserStation(item.author_id).subscribe(ret => {
            if (ret && ret.row_count) {
                toastr.success('删除成功！');
                this.search();
            }
            this.eventManager.broadcast({name: 'station-selector-refresh', data: this.user.staff_id});
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
        this.userService.addUserStation(this.user.staff_id, item.station_id).subscribe(ret => {
            this.onPageChange(null);
            this.eventManager.broadcast({name: 'station-selector-refresh', data: this.user.staff_id});
        });
    }
}