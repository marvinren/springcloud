import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'stationSelectorTypePipe'})
export class StationSelectorTypePipe implements PipeTransform {
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