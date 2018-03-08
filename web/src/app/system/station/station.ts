import {Pipe, PipeTransform} from '@angular/core';

export class Station {
    station_id: number;
    code: string;  // 编号
    name: string; // 名称
    notes: string; // 备注
    state: number; // 状态
    type: number; // 类型
    operate_type: string;
    readonly: boolean;

    constructor() {
        this.state = 1;
        this.type = 1;
    }
}

@Pipe({name: 'stationTypePipe'})
export class StationTypePipe implements PipeTransform {
    transform(type: string): any {
        if (type === '1') {
            return '数据权限';
        }
        if (type === '2') {
            return '流程角色';
        }
        if (type === '3') {
            return '功能权限';
        }
        return '';
    }
}
@Pipe({name: 'stationTypeNumPipe'})
export  class StationTypeNumPipe implements  PipeTransform {
    transform(type: number): any {
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
}