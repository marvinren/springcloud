import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'optypePipe'})
export class OptypePipe implements PipeTransform {
    transform(op_type_id: number): any {
        if (op_type_id === 0) {
            return '操作类型名称';
        }
        if (op_type_id === 1) {
            return '编码';
        }
    }
}