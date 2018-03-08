import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HeaderMessage} from 'app/app.constants';
import {Observable} from 'rxjs/Observable';
import {Dictionary} from 'app/system/dictionary/dictionary';
import {types} from 'app/system/dictionary/types';

@Injectable()
export class DictionaryService {

    constructor(private http: Http) {
    }

    getAllDictionary(param_type): Observable<any> {
        let url = 'platform/system/sys_param/params?t=' + (new Date().getTime()) + '&param_type=' + param_type;
        return this.http.get(url);
    }

    getLocalAlldict() {
        return types;
    }

    buildDictionaryTree(list) {
        let root = [];
        let last = [];
        list.forEach(e => {
            e.show = true;
            e.opened = true;
            e.has_keyword = false;
            e.last_show = false;
            if (e.parent_param_type) {
                last.push(e);
            } else {
                root.push(e);
            }
        });
        if (root.length) {
            root[root.length - 1].last_show = true;
        }
        if (last.length) {
            this.buildDictionaryTreeChildren(root, last);
        }
        return root;
    }

    buildDictionaryTreeChildren(parents, last) {
        let temp = []; // 存储每次比对后剩下的元素
        parents.forEach(p => {
            p.children = [];
            temp = [];
            last.forEach(c => {
                if (c.parent_param_type === p.param_name) {
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
                this.buildDictionaryTreeChildren(p.children, last);
            }
        });
    }

    searchDictionary(dictionary: Dictionary [], keyword) {
        let t = false;
        let last_show_index = 0;
        dictionary.forEach((f, index) => {
            f.last_show = false;
            if (!keyword) {
                f.show = true;
                f.has_keyword = false;
                last_show_index = index;
            } else if (f.param_name.toUpperCase().indexOf(keyword.toUpperCase()) >= 0 || f.param_type.indexOf(keyword.toUpperCase()) >= 0) {
                f.show = true;
                f.has_keyword = true;
                last_show_index = index;
                t = true;
            } else {
                f.show = false;
                f.has_keyword = false;
            }
            if (f.children && f.children.length) {
                let t_child = this.searchDictionary(f.children, keyword);
                if (t_child) {
                    f.show = true;
                    t = true;
                    last_show_index = index;
                }
            }
        });
        dictionary[last_show_index].last_show = true;
        return t;
    }

    getDictionary(param_type): Observable<any> {
        let url = 'platform/system/sys_param/' + param_type + '?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    addDictionary(dictionary: Dictionary): Observable<any> {
        let url = 'platform/system/sys_param/';
        dictionary.operate_type = 'C';
        return this.http.post(url, dictionary);
    }

    editDictionary(dictionary: Dictionary): Observable<any> {
        let url = 'platform/system/sys_param/' + dictionary.param_type;
        dictionary.operate_type = 'U';
        return this.http.put(url, dictionary);
    }

    deleteDictionary(param_type): Observable<any> {
        let url = 'platform/system/sys_param/' + param_type;
        return this.http.delete(url);
    }
}