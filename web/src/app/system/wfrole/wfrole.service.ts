import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HeaderMessage} from 'app/app.constants';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WorkflowRoleService {

    constructor(private http: Http) {

    }

    add(item): Observable<any> {
        let url = 'platform/system/wf_role/';
        item.operate_type = 'C';
        return this.http.post(url, item);
    }

    edit(item): Observable<any> {
        let url = 'platform/system/wf_role/' + item.wf_role_id;
        item.operate_type = 'U';
        return this.http.put(url, item);
    }

    delete(wf_role_id): Observable<any> {
        let url = 'platform/system/wf_role/' + wf_role_id;
        return this.http.delete(url);
    }

    search(pagination): Observable<any> {
        let url = 'platform/system/wf_role/all?t=' + (new Date().getTime()) + '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        if (pagination.keyword) {
            url += '&keyword=' + encodeURIComponent(pagination.keyword);
        }
        if (pagination.process_key) {
            url += '&process_key=' + pagination.process_key;
        }
        if (pagination.selected_station_id) {
            url += '&selected_station_id=' + pagination.selected_station_id;
        }
        return this.http.get(url);
    }

}