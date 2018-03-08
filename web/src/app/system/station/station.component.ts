import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from 'app/global.service';
import {StationService} from './station.service';
import {Station} from './station';
import {LoginUser} from 'app/login/login.user';
@Component({
    selector: 'ai-system-station',
    templateUrl: './station.component.html',
    styleUrls: ['station.scss']
})
export class StationComponent implements OnInit {

    user: LoginUser;

    stationList = [];
    currentItem: Station;
    rightModel = 'hide';
    pagination = {
        keyword: '',
        page_no: 1,
        row_count: 0,
        page_size: 15
    };

    constructor(private router: Router, private globelService: GlobalService, private stationService: StationService) {
    }

    ngOnInit() {
        this.globelService.user.subscribe(user => {
            this.user = user;
        });
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
        this.stationService.getStationsPage(this.pagination).subscribe(ret => {
            if (ret.page_data && ret.page_data.length) {
                this.stationList = ret.page_data;
                this.pagination.row_count = ret.row_count;
            } else {
                this.stationList = [];
                this.pagination.row_count = 0;
            }
        });


    }

    add() {
        this.currentItem = new Station();
        this.currentItem.readonly = false;
        this.rightModel = 'show';
    }

    edit(item) {
        this.currentItem = JSON.parse(JSON.stringify(item));
        this.currentItem.readonly = false;
        this.rightModel = 'show';
    }

    delete(item) {
        this.stationService.deleteStation(item.station_id).subscribe(ret => {
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
        }, 500);
    }

    onSubmitSuccess(state) {
        this.onPageChange(null);
        this.closeRight(1);
    }
}