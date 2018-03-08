import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HeaderMessage} from 'app/app.constants';
import {Observable} from 'rxjs/Observable';
import {Station} from './station';

@Injectable()
export class StationService {

    constructor(private http: Http) {
    }

    getStationsPage(pagination): Observable<any> {
        let url = 'platform/system/station/all?t=' + (new Date().getTime()) + '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        if (pagination.keyword) {
            url += '&keyword=' + encodeURIComponent(pagination.keyword);
        }
        if (pagination.selected_staff_id) {
            url += '&selected_staff_id=' + pagination.selected_staff_id;
        }
        return this.http.get(url);
    }

    addStation(station: Station): Observable<any> {
        let url = 'platform/system/station';
        let data = {
            code: station.code,
            name: station.name,
            notes: station.notes,
            type: station.type,
            operate_type: 'C'
        };
        return this.http.post(url, data);
    }

    getStation(station_id): Observable<any> {
         let url = 'platform/system/station/' + station_id + '?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    deleteStation(station_id): Observable<any> {
         let url = 'platform/system/station/' + station_id;
        return this.http.delete(url);
    }

    editStation(station: Station): Observable<any> {
        let url = 'platform/system/station/' + station.station_id;
        let data = {
            station_id: station.station_id,
            code: station.code,
            state: station.state,
            name: station.name,
            notes: station.notes,
            type: station.type
        };
        return this.http.put(url, data);
    }

    searchStationDatarolePage(pagination): Observable<any> {
        let url = 'platform/system/station_data_role/all?t=' + (new Date().getTime()) + '&station_id=' + pagination.station_id;
        url += '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        return this.http.get(url);
    }

    addStationDatarole(item): Observable<any> {
        let url = 'platform/system/station_data_role';
        return this.http.post(url, item);
    }

    deleteStationDatarole(item): Observable<any> {
        let url = 'platform/system/station_data_role/' + item.rel_id;
        return this.http.delete(url);
    }


    // 获取岗位下的菜单权限
    getAllFunsByStationId(station_id): Observable<any> {
         let url = 'platform/system/station_function/all?t=' + (new Date().getTime()) + '&station_id=' + station_id;
        return this.http.get(url);
    }

    addStationFun(station_id, list): Observable<any> {
        let url = 'platform/system/station_function';
        let data = {
            station_id: station_id,
            func_dtos: list
        };
        return this.http.post(url, data);
    }


    searchStationWfrolePage(pagination): Observable<any> {
        let url = 'platform/system/station_wf_role/all?t=' + (new Date().getTime()) + '&station_id=' + pagination.station_id;
        url += '&page_no=' + pagination.page_no + '&page_size=' + pagination.page_size;
        return this.http.get(url);
    }

    addStationWfrole(item): Observable<any> {
        let url = 'platform/system/station_wf_role';
        item.operate_type = 'C';
        return this.http.post(url, item);
    }

    deleteStationWfrole(item): Observable<any> {
         let url = 'platform/system/station_wf_role/' + item.rel_id;
        return this.http.delete(url);
    }
}