import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ng2-webstorage';
import {LoginService} from 'app/login/login.service';
import {GlobalService} from 'app/global.service';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

    username = '';
    password = '';
    verification_code: string; // 验证码
    error: string;
    codeUrl: any;
    valid_code: string; // 安全码
    recordFlag = true;
    requestCodeFlag = false;

    constructor(private router: Router, private global: GlobalService, private storage: LocalStorageService, private loginService: LoginService, private _sanitizer: DomSanitizer) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loginService.getValidataCode().subscribe(ret => {
            this.getVerificationCode();
        });
    }

    /* 获取验证码 **/
    getVerificationCode() {
        this.requestCodeFlag = true;
        this.codeUrl = '';
        this.loginService.getValidataCode().subscribe(ret => {
            this.codeUrl = ret && ret.img ? this._sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + ret.img) : '';
            this.valid_code = ret.key;
        });
    }

    token(form) {
        this.error = '';
        if (form.invalid) {
            if (!this.username) {
                this.error = '用户名不能为空';
            }
            if (!this.password) {
                this.error = '密码不能为空';
            }
            if (!this.verification_code) {
                this.error = '验证码不能为空';
            }
            return;
        }
        toastr.info('登录中...', '', {timeOut: 1000 * 30});
        this.loginService.token(this.username, this.password, this.valid_code, this.verification_code).subscribe(ret => {
            toastr.clear();
            if (!ret || !ret.staff_id || !ret.access_token) {
                toastr.warning('登录失败！');
                return;
            }
            toastr.info('验证中...', '', {timeOut: 1000 * 30});
            this.loginService.getLoginUserInfo(ret.staff_id).subscribe(loginRet => {
                toastr.clear();
                if (!loginRet || !loginRet.staff_id) {
                    toastr.warning('登录失败！');
                    return;
                }
                toastr.success('登录成功！');
                // 更新存入token
                this.storage.store('token', ret);
                this.global.updateToken(ret);
                // 更新用户
                this.storage.store('user', loginRet);
                this.global.updateUser(loginRet);
                this.router.navigate(['pages/home']);
            });

        });
    }

    changePwd() {
        toastr.info('功能准备中，敬请期待！');
        // this.router.navigate(['pages/home']);
    }

}