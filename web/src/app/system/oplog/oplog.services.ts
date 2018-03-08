import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Oplog} from './oplog';


@Injectable()
export class OplogServices {

    constructor(private http: Http) {
    }

    getoplogPage(pagination): Observable<any> {
         let url = 'platform/system/op_log/all?t=' + (new Date().getTime()) + '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        if (pagination.op_type_id) {
            url += '&op_type_id=' + pagination.op_type_id;
        }
        if (pagination.op_content) {
            url += '&opContent=' + encodeURIComponent(pagination.op_content);
        }
        if (pagination.keyword) {
            url += '&keyword=' + encodeURIComponent(pagination.keyword);
        }
        if (pagination.start_time) {
            url += '&start_time=' + pagination.start_time;
        }
        if (pagination.end_time) {
            url += '&keyword=' + pagination.end_time;
        }
        return this.http.get(url);
    }
}