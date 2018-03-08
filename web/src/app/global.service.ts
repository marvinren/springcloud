import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Token} from './login/login.model';
import {SysFun, FunService} from 'app/system/fun';
import {LoginUser} from 'app/login/login.user';

@Injectable()
export class GlobalService {
    token: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);
    user: BehaviorSubject<LoginUser> = new BehaviorSubject<LoginUser>(null);
    userFuns: BehaviorSubject<SysFun[]> = new BehaviorSubject<SysFun[]>([]);
    userFunsMap: BehaviorSubject<Map<String, SysFun>> = new BehaviorSubject<Map<String, SysFun>>(null);

    constructor(private storage: LocalStorageService, private funService: FunService) {
        this.updateUser(this.storage.retrieve('user'));
        this.updateToken(this.storage.retrieve('token'));
    }

    updateToken(token: Token) {
        this.token.next(token);
    }

    updateUser(user: LoginUser) {
        this.user.next(user);
        if (user && user.function_dto && user.function_dto.length) {
            // 更新菜单36
            let userFunsMap = new Map<String, SysFun>();
            user.function_dto.forEach(fun => {
                userFunsMap.set('' + fun.func_code, fun);
            });
            this.updateUserFunsMap(userFunsMap);
            let funTree = this.funService.buildFunTree(user.function_dto);
            this.updateUserFuns(funTree);
        } else {
            this.updateUserFunsMap(new Map());
            this.updateUserFuns([]);
        }
        this.updateUserOrderTotal(); // 更新菜单统计
    }

    updateUserOrderTotal() {
        let user = this.storage.retrieve('user');
    }

    private updateUserFuns(userFuns: SysFun[]) {
        this.userFuns.next(userFuns);
    }

    private updateUserFunsMap(userFunsMap: Map<String, SysFun>) {
        this.userFunsMap.next(userFunsMap);
    }
}