import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Organize} from 'app/system/org';

@Injectable()
export class OrgService {

    constructor(private http: Http) {
    }

    // 根据父主键逐级查询
    getOrgsByParent(pagination): Observable<any> {
        let url = 'platform/system/organize/query?t=' + (new Date().getTime());
        if (pagination.state != null) {
            url += '&state=' + pagination.state;
        }
        if (pagination.parent_organize_id != null) {
            url += '&parent_organize_id=' + pagination.parent_organize_id;
        }
        return this.http.get(url);
    }


    // 查询出全部数据拼装成树的方案
    getAllOrgs(state): Observable<any> {
        let url = 'platform/system/organize/all?t=' + (new Date().getTime());
        if (state != null) {
            url += '?state=' + state;
        }
        return this.http.get(url);
    }

    // 拼装成树
    buildOrgTree(list: Organize[]) {
        let root = [];
        let last = [];
        list.forEach(e => {
            e.show = true;
            e.opened = false;
            e.has_keyword = false;
            e.last_show = false;
            if (e.parent_organize_id !== null && e.parent_organize_id !== undefined) {
                last.push(e);
            } else {
                root.push(e);
            }
        });
        if (root.length) {
            root[root.length - 1].last_show = true;
        }
        if (last.length) {
            this.buildOrgTreeChildren(root, last);
        }
        return root;
    }

    // 拼装子树
    buildOrgTreeChildren(parents, last) {
        let temp = []; // 存储每次比对后剩下的元素
        parents.forEach(p => {
            p.children = [];
            temp = [];
            last.forEach(c => {
                if (c.parent_organize_id === p.organize_id) {
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
                this.buildOrgTreeChildren(p.children, last);
            }
        });
    }

    // 从树中筛选查询
    searchOrgs(orgs: Organize[], keyword) {
        let t = false;
        let last_show_index = 0;
        orgs.forEach((f, index) => {
            f.last_show = false;
            if (!keyword) {
                f.show = true;
                f.has_keyword = false;
                last_show_index = index;
            } else if (f.organize_name.indexOf(keyword) >= 0 || f.code.indexOf(keyword) >= 0) {
                f.show = true;
                f.has_keyword = true;
                last_show_index = index;
                t = true;
            } else {
                f.show = false;
                f.has_keyword = false;
            }
            if (f.children && f.children.length) {
                let t_child = this.searchOrgs(f.children, keyword);
                if (t_child) {
                    f.show = true;
                    t = true;
                    last_show_index = index;
                }
            }
        });
        orgs[last_show_index].last_show = true;
        return t;
    }

    getOrg(organize_id): Observable<any> {
        let url = 'platform/system/organize/' + organize_id + '?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    addOrg(org: Organize): Observable<any> {
        let url = 'platform/system/organize/';
        org.operate_type = 'C';
        return this.http.post(url, org);
    }

    editOrg(org: Organize): Observable<any> {
        let url = 'platform/system/organize/' + org.organize_id;
        org.operate_type = 'U';
        return this.http.put(url, org);
    }

    deleteOrg(organize_id): Observable<any> {
        let url = 'platform/system/organize/' + organize_id;
        return this.http.delete(url);
    }
}