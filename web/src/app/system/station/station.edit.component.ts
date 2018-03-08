import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StationService} from './station.service';
import {Station} from './station';

@Component({
    selector: 'ai-system-station-edit',
    templateUrl: './station.edit.component.html'
})
export class StationEditComponent implements OnInit {

    @Input() station: Station = new Station();
    @Output() onCancel = new EventEmitter();
    @Output() onSubmitSuccess = new EventEmitter();

    constructor(private stationService: StationService) {
    }

    ngOnInit() {
    }

    getTypeDesc(type) {
        if (type === 1) {
            return '数据权限';
        }
        if (type === 2) {
            return '流程角色';
        }
        if (type === 3) {
            return '功能权限';
        }
        return '';
    }

    _onCancel() {
        this.onCancel.emit(0);
    }

    add(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.stationService.addStation(this.station).subscribe(ret => {
            this.station.station_id = ret.station_id;
            toastr.success('新增成功！');
            this.onSubmitSuccess.emit(1);
        });
    }

    edit(form) {
        if (!this.validateForm(form)) {
            return;
        }
        this.stationService.editStation(this.station).subscribe(ret => {
            if (ret.code === 1) {
                toastr.success('修改成功！');
                this.onSubmitSuccess.emit(1);
            }
        });
    }

    validateForm(form) {
        if (form.invalid) {
            return false;
        }
        return true;
    }
}