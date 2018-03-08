import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HeaderMessage} from 'app/app.constants';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataroleService {

    constructor(private http: Http) {

    }

    add(datarole): Observable<any> {
        let url = 'platform/system/data_role/';
        datarole.operate_type = 'C';
        return this.http.post(url, datarole);
    }

    edit(datarole): Observable<any> {
        let url = 'platform/system/data_role/' + datarole.data_role_id;
        datarole.operate_type = 'U';
        return this.http.put(url, datarole);
    }

    delete(data_role_id): Observable<any> {
         let url = 'platform/system/data_role/' + data_role_id;
        return this.http.delete(url);
    }

    search(pagination): Observable<any> {
        let url = 'platform/system/data_role/all?t=' + (new Date().getTime()) + '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        if (pagination.keyword) {
            url += '&keyword=' + encodeURIComponent(pagination.keyword);
        }
        if (pagination.organize_id) {
            url += '&organize_id=' + pagination.organize_id;
        }
        return this.http.get(url);
    }

}