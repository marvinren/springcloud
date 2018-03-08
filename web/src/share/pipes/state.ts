import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'statePipe'})
export class StatePipe implements PipeTransform {
    transform(state: number): any {
        if (state === 0) {
            return '注销';
        }
        if (state === 1) {
            return '正常';
        }
    }
}