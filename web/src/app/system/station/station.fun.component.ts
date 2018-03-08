import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StationService} from './station.service';
import {Station} from './station';
import {GlobalService} from 'app/global.service';
import {LoginUser} from 'src/app/login/login.user';
import {FunService} from 'app/system/fun';

@Component({
    selector: 'ai-system-station-fun',
    templateUrl: './station.fun.component.html'
})
export class StationFunComponent implements OnInit {
    @Input() station = new Station();

    user = new LoginUser();

    funTree = [];

    constructor(private stationService: StationService, private funService: FunService, private _global: GlobalService) {
    }

    ngOnInit() {
        this._global.user.subscribe(user => {
            this.user = user;
        });
        this.getAllFuns();
    }

    getAllFuns() {
        if (!this.station || !this.station.station_id) {
            return;
        }
        this.stationService.getAllFunsByStationId(this.station.station_id).subscribe(ret => {
            if (ret && ret.length) {
                this.funTree = this.funService.buildFunTree(ret);
            }
        });
    }

    onCancel(event) {
        this.getAllFuns();
    }

    onSubmit(event) {
        if (event && event.length) {
            let list = [];
            event.forEach(item => {
                list.push({
                    station_id: this.station.station_id,
                    func_id: item.func_id,
                    state: 1,
                    notes: null,
                    operate_type: 'C'
                });
            });
            this.stationService.addStationFun(this.station.station_id, list).subscribe(ret => {
                console.dir(ret);
                if (ret) {
                    toastr.success('更新成功！');
                    this.getAllFuns();
                }
            });
        }
    }
}