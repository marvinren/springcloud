import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Sha1} from 'app/tools/sha1';

const Base64 = require('crypto-js/enc-base64');
const Utf8 = require('crypto-js/enc-utf8');

@Injectable()
export class LoginService {

    constructor(private http: Http) {
    }

    token(username, password, valid_code, verification_code): Observable<any> {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        data.append('valid_code', valid_code); // 安全码
        data.append('verification_code', verification_code); // 验证码
        data.append('grant_type', 'password');
        data.append('scope', 'read');
        // data.append('loginType', 'OALogin');
        let headers = new Headers();
        headers.set('Authorization', `Basic ${Base64.stringify(Utf8.parse(ENV.client_id + ':' + ENV.client_secret))}`);
        headers.set('Content-Type', undefined);
        headers.set('Block-Message', '正在验证用户名密码...');
        return this.http.post('/uaa/oauth/token', data, {headers: headers});
    }
    ssotoken(username): Observable<any> {
        const data = new FormData();
        data.append('username', username);
        data.append('loginType', 'ssoLogin');
        // data.append('orderId', '1000');
        let headers = new Headers();
        headers.set('Authorization', `Basic ${Base64.stringify(Utf8.parse(ENV.client_id + ':' + ENV.client_secret))}`);
        headers.set('Content-Type', undefined);
        // headers.set('orderId', '1000');
        headers.set('username', username);
        headers.set('Block-Message', '正在验证用户名密码...');
        return this.http.post('/uaa/oauth/token', data, {headers: headers});
    }
    getLoginInfo(tokenn): Observable<any> {
        const data = new FormData();
        data.append('username', tokenn.username);
        data.append('order_id', tokenn.order_id);
        let headers = new Headers();
        headers.set('Authorization', `Basic ${Base64.stringify(Utf8.parse(ENV.client_id + ':' + ENV.client_secret))}`);
        headers.set('Content-Type', undefined);
        headers.set('order_id', tokenn.order_id);
        headers.set('username', tokenn.username);
        headers.set('Block-Message', '正在验证用户名密码...');
        return this.http.post('/workflow-xj/ssoLogin/getLoginInfo ', data, {headers: headers});
    }
    getLoginInfoo(tokenn): Observable<any> {
        let url = 'workflow-xj/ssoLogin/getLoginInfo?order_id=' + tokenn.order_id;
        // let url = 'workflow-xj/ssoLogin/getLoginInfo?order_id=' + tokenn.order_id + '&username=' + tokenn.username;
        return this.http.get(url);
    }

    getLoginUserInfo(staff_id): Observable<any> {
        let url = '/platform/system/login/info?staff_id=' + staff_id + '&t=' + (new Date().getTime());
        return this.http.get(url);
    }

    getValidataCode(): Observable<any> {
        let url = 'platform/system/image?t=' + (new Date().getTime());
        return this.http.get(url);
    }

    logout(login_log_id): Observable<any> {
        let url = 'platform/system/loginout';
        let data = {
            login_log_id: login_log_id,
        };
        return this.http.post('platform/system/loginout', data);
    }

    getUsercm(tradeId, token): Observable<any> {
        let reqSource = '';
        let secret = '';
        let url = '';
        let reqParam = {
            tradeId: tradeId,
            token: token
        };
        let reqParamString = JSON.stringify(reqParam);
        let data = new FormData();
        data.append('reqSource', reqSource);
        data.append('busiCode', 'getUser');
        data.append('reqParam', reqParamString);
        let fp = Sha1.createSha1(reqSource + reqParamString + secret);
        data.append('fp', fp);
        // 返回 returnCode、returnMsg、userId
        return this.http.post(url, data);
    }
}