import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HeaderMessage} from 'app/app.constants';
import {Observable} from 'rxjs/Observable';
import {Optype} from './optype';

@Injectable()
export class OptypeService {

    constructor(private http: Http) {
    }


    getOptypePage(pagination): Observable<any> {
        let url = 'platform/system/op_type_def/all?t=' + (new Date().getTime()) + '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        if (pagination.op_type_name) {
            url += '&op_type_name=' + encodeURIComponent(pagination.op_type_name);
        }
        return this.http.get(url);
    }


    addOptype(optype: Optype): Observable<any> {
        let url = 'platform/system/op_type_def';
        optype.operate_type = 'C';
        return this.http.post(url, optype);
    }

    getOptype(op_type_id): Observable<any> {
        let url = 'platform/system/op_type_def/' + op_type_id + '?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    deleteOptype(op_type_id): Observable<any> {
        let url = 'platform/system/op_type_def/' + op_type_id;
        return this.http.delete(url);
    }

    editOptype(optype: Optype): Observable<any> {
        let url = 'platform/system/op_type_def/' + optype.op_type_id;
        optype.operate_type = 'U';
        return this.http.put(url, optype);
    }

}