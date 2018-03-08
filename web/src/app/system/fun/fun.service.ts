import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HeaderMessage} from 'app/app.constants';
import {Observable} from 'rxjs/Observable';
import {SysFun} from './fun';

@Injectable()
export class FunService {

    constructor(private http: Http) {
    }

    getAllFuns(state): Observable<any> {
         let url = 'platform/system/functions?t=' + (new Date().getTime());
         if (state != null) {
             url += '&state=' + state;
         }
        return this.http.get(url);
    }

    buildFunTree(list: SysFun[]) {
        let root = [];
        let last = [];
        list.forEach(e => {
            e.show = true;
            e.opened = false;
            e.has_keyword = false;
            if (e.parent_id) {
                last.push(e);
            } else {
                root.push(e);
            }
        });
        if (root.length) {
            root[root.length - 1].last_show = true;
        }
        if (last.length) {
            this.buildFunTreeChildren(root, last);
        }
        return root;
    }

    buildFunTreeChildren(parents, last) {
        let temp = []; // 存储每次比对后剩下的元素
        parents.forEach(p => {
            p.children = [];
            temp = [];
            last.forEach(c => {
                if (c.parent_id === p.func_id) {
                    p.children.push(c);
                } else {
                    temp.push(c);
                }
            });
            if (p.children.length) {
                p.children[p.children.length - 1].last_show = true;
            }
            last = temp; // 更新数组
            if (p.children.length) {
                this.buildFunTreeChildren(p.children, last);
            }
        });
    }

    searchFuns(funs: SysFun[], keyword) {
        let t = false;
        let last_show_index = 0;
        funs.forEach((f, index) => {
            f.last_show = false;
            if (!keyword) {
                f.show = true;
                f.has_keyword = false;
                last_show_index = index;
            } else if (f.name.indexOf(keyword) >= 0 || f.func_code.indexOf(keyword) >= 0) {
                f.show = true;
                f.has_keyword = true;
                last_show_index = index;
                t = true;
            } else {
                f.show = false;
                f.has_keyword = false;
            }
            if (f.children && f.children.length) {
                let t_child = this.searchFuns(f.children, keyword);
                if (t_child) {
                    f.show = true;
                    t = true;
                    last_show_index = index;
                }
            }
        });
        funs[last_show_index].last_show = true;
        return t;
    }


    getFun(func_id): Observable<any> {
         let url = 'platform/system/function/' + func_id + '?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    addFun(fun: SysFun): Observable<any> {
        let url = 'platform/system/function/';
        fun.operate_type = 'C';
        let data = {
            func_id: fun.func_id,
            func_code: fun.func_code,
            name: fun.name,
            notes: fun.notes,
            parent_id: fun.parent_id,
            fun_seq: fun.fun_seq,
            view_path: fun.view_path,
            func_type: fun.func_type,
            state: fun.state,
            operate_type: 'C'
        };
        return this.http.post(url, data);
    }

    editFun(fun: SysFun): Observable<any> {
        let url = 'platform/system/function/' + fun.func_id;
        fun.operate_type = 'U';
        let data = {
            func_id: fun.func_id,
            func_code: fun.func_code,
            name: fun.name,
            notes: fun.notes,
            parent_id: fun.parent_id,
            fun_seq: fun.fun_seq,
            view_path: fun.view_path,
            func_type: fun.func_type,
            state: fun.state,
            operate_type: 'U'
        };
        return this.http.put(url, fun);
    }

    deleteFun(func_id): Observable<any> {
         let url = 'platform/system/function/' + func_id;
        return this.http.delete(url);
    }
}