import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HeaderMessage} from 'app/app.constants';
import {Observable} from 'rxjs/Observable';
import {Orgtype} from './orgtype';

@Injectable()
export class OrgtypeService {

    constructor(private http: Http) {
    }

    getOrgtypePage(pagination): Observable<any> {
        let url = 'platform/system/organize_type/all?t=' + (new Date().getTime()) + '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        if (pagination.keyword) {
            url += '&keyword=' + encodeURIComponent(pagination.keyword);
        }
        return this.http.get(url);
    }

    addOrgtype(orgtype: Orgtype): Observable<any> {
        let url = 'platform/system/organize_type/';
        orgtype.operate_type = 'C';
        return this.http.post(url, orgtype);
    }

    getOrgtype(organize_type_id): Observable<any> {
        let url = 'platform/system/organize_type/' + organize_type_id + '?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    deleteOrgtype(organize_type_id): Observable<any> {
         let url = 'platform/system/organize_type/' + organize_type_id;
        return this.http.delete(url);
    }

    editOrgtype(orgtype: Orgtype): Observable<any> {
         let url = 'platform/system/organize_type/' + orgtype.organize_type_id;
         orgtype.operate_type = 'U';
        return this.http.put(url, orgtype);
    }

}