import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TinymceService {
    constructor(private http: Http) {
    }

    upload(attach): Observable<any> {
        let url = 'platform/sys/file/upload/attachments';
        let data = new FormData();
        data.append('file', attach.file);
        data.append('file_type', attach.file_type);
        data.append('file_name', attach.file_name);
        data.append('file_resource', attach.file_resource);
        data.append('submit_staff_id ', attach.submit_staff_id);
        let header = new Headers();
        header.set('content-type', undefined); // 必须
        return this.http.post(url, data, {headers: header});
    }
}