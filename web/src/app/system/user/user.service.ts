import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HeaderMessage} from 'app/app.constants';
import {Observable} from 'rxjs/Observable';
import {User} from 'app/system/user/user';

@Injectable()
export class UserService {

    constructor(private http: Http) {
    }

    searchUserPage(pagination): Observable<any> {
        let url = 'platform/system/staff/all?t=' + (new Date().getTime()) + '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        if (pagination.employee_name) {
            url += '&employee_name=' + encodeURIComponent(pagination.employee_name);
        }
        if (pagination.keyword) {
            url += '&keyword=' + encodeURIComponent(pagination.keyword);
        }
        if (pagination.bill_id) {
            url += '&bill_id=' + pagination.bill_id;
        }
        if (pagination.organize_id) {
            url += '&organize_id=' + pagination.organize_id;
        }
        return this.http.get(url);
    }

    getUserByStaffId(staff_id): Observable<any> {
        let url = 'platform/system/staff/' + staff_id + '?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    editUser(user): Observable<any> {
        let url = 'platform/system/staff/' + user.staff_id;
        let data = {
            staff_id: user.staff_id,
            code: user.code,
            password: null,
            employee_name: user.employee_name,
            bill_id: user.bill_id,
            email: user.email,
            religion: user.religion,
            organize_id: user.organize_id,
            notes: user.notes,
            state: user.state,
            lock_flag: 0,
            operate_type: 'U'
        };
        if (user.password) {
            data.password = user.password;
        }
        return this.http.put(url, data);
    }

    addUser(user: User): Observable<any> {
        let url = 'platform/system/staff/';
        user.state = 1;
        user.password = user.password || '123456';
        user.operate_type = 'C';
        return this.http.post(url, user);
    }

    deleteUser(staff_id): Observable<any> {
         let url = 'platform/system/staff/' + staff_id;
        return this.http.delete(url);
    }

    getUserOrg(staff_id): Observable<any> {
         let url = 'platform/system/staff_org_relat/staff/' + staff_id + '?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    addUserOrg(user, org): Observable<any> {
        let url = 'platform/system/staff_org_relat';
        let data = {
            organize_id: org.organize_id,
            staff_id: user.staff_id,
            state: 1,
            notes: '',
            operate_type: 'C'
        };
        return this.http.post(url, data);
    }

    deleteUserOrg(staff_org_relat_id): Observable<any> {
         let url = 'platform/system/staff_org_relat/' + staff_org_relat_id;
        return this.http.delete(url);
    }

    getUserStationsPage(pagination): Observable<any> {
        let url = 'platform/system/author/staffs?t=' + (new Date().getTime()) + '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        url += '&staff_id=' + pagination.staff_id;
        return this.http.get(url);
    }

    addUserStation(staff_id, station_id): Observable<any> {
        let url = 'platform/system/author';
        let data = {
            staff_id: staff_id,
            station_id: station_id,
            state: 1
        };
        return this.http.post(url, data);
    }

    deleteUserStation(author_id): Observable<any> {
         let url = 'platform/system/author/' + author_id;
        return this.http.delete(url);
    }
}