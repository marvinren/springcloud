import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HeaderMessage} from 'app/app.constants';
import {Observable} from 'rxjs/Observable';
import {Workgroup} from './workgroup';

@Injectable()
export class WorkgroupService {

    constructor(private http: Http) {
    }

    getWorkgroupPage(pagination): Observable<any> {
        let url = 'platform/system/work_group/all?t=' + (new Date().getTime()) + '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        if (pagination.work_group_name) {
            url += '&work_group_name=' + encodeURIComponent(pagination.work_group_name);
        }
        if (pagination.code) {
            url += '&code=' + pagination.code;
        }
        return this.http.get(url);
    }

    addWorkgroup(workgroup: Workgroup): Observable<any> {
        let url = 'platform/system/work_group';
        workgroup.operate_type = 'C';
        return this.http.post(url, workgroup);
    }

    getWorkgroup(work_group_id): Observable<any> {
         let url = 'platform/system/work_group/' + work_group_id + '?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    deleteWorkgroup(work_group_id): Observable<any> {
         let url = 'platform/system/work_group/' + work_group_id;
        return this.http.delete(url);
    }

    editWorkgroup(workgroup: Workgroup): Observable<any> {
         let url = 'platform/system/work_group/' + workgroup.work_group_id;
        let data = {
            work_group_id: workgroup.work_group_id,
            code: workgroup.code,
            work_group_name: workgroup.work_group_name,
            notes: workgroup.notes,
            operate_type: 'U'
        };
        return this.http.put(url, workgroup);
    }

    searchWorkgroupUserPage(pagination): Observable<any> {
        let url = 'platform/system/staff_working_group/all?t=' + (new Date().getTime()) + '&work_group_id=' + pagination.work_group_id;
        url += '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        return this.http.get(url);
    }

    addWorkgroupUser(item): Observable<any> {
         let url = 'platform/system/staff_working_group';
        return this.http.post(url, item);
    }

    deleteWorkgroupUser(item): Observable<any> {
         let url = 'platform/system/staff_working_group/' + item.rel_id;
        return this.http.delete(url);
    }

}