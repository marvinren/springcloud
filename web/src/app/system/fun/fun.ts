/*功能菜单表*/
import {Pipe, PipeTransform} from '@angular/core';
export class SysFun {
    func_id: number;
    func_code: string;
    name: string;
    notes: string;
    parent_id: number;
    fun_seq: number;
    view_path: string;
    func_type: string;
    state: number;

    children: SysFun[];
    operate_type: string;
    readonly: boolean; // 编辑页面是否只读
    opened: boolean; // 树结构里是否打开子节点
    show: boolean; // 树结构里是否显示
    has_keyword: boolean; // 树结构里是否含有搜索关键字
    last_show: boolean; // 树结构里是否是兄弟节点里的最后显示项

    constructor() {
        this.show = true;
        this.has_keyword = false;
        this.readonly = false;
        this.func_type = 'H';
        this.state = 1;
    }
}

@Pipe({name: 'funTypePipe'})
export class FunTypePipe implements PipeTransform {
    transform(func_type: string): any {
        if (func_type === 'H') {
            return 'html';
        }
        if (func_type === 'C') {
            return 'client';
        }
        return '';
    }
}

