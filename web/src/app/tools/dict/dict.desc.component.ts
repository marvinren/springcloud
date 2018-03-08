import {Component, OnInit, DoCheck, Input, Output, EventEmitter} from '@angular/core';
import {DictionaryService} from 'app/system/dictionary';
import {LocalStorageService} from 'ng2-webstorage';
@Component({
    selector: 'ai-dict-desc',
    template: `<span>{{dictDesc}}</span>`
})
export class DictDescComponent implements OnInit, DoCheck {

    @Input() obj;
    @Input() fieldName; // 属性名
    @Input() dictType; // 数据字典类型

    dictDesc = '';
    list = [];
    map = new Map();
    inited = false;
    lastVal;

    constructor(private dictionaryService: DictionaryService, private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.initDate();
    }

    ngDoCheck() {
        if (this.inited) {
            let val = this.obj[this.fieldName] !== null && this.obj[this.fieldName] !== undefined ? '' + this.obj[this.fieldName] : '';
            if (this.lastVal === val) {
                return;
            }
            this.lastVal = val;
            this.dictDesc = this.extracted(val);
        }
    }

    initDate() {
        let val = this.obj[this.fieldName] !== null && this.obj[this.fieldName] !== undefined ? '' + this.obj[this.fieldName] : '';
        this.lastVal = val;
        // 先从本地缓存拿
        let local_data = this.localStorageService.retrieve('ai-dict-' + this.dictType);
        if (local_data && local_data.length) {
            this.list = local_data;
            this.list.forEach(item => {
                this.map.set('' + item.param_no, item.param_name);
            });
            this.dictDesc = this.extracted(val);
            this.inited = true;
            return;
        }
        // 防止高频率重复提交机制，当已经有一个请求发起时，延迟加载本函数。
        if (this.localStorageService.retrieve('loading.ai-dict-' + this.dictType)) {
            console.log('loading.ai-dict-' + this.dictType + '请求已经发起，稍后继续访问');
            setTimeout(() => {
                this.localStorageService.store('loading.ai-dict-' + this.dictType, false); // 标记请求已经结束
                this.initDate();
            }, 2000);
            return;
        }
        this.localStorageService.store('loading.ai-dict-' + this.dictType, true); // 标记请求已经发起
        this.dictionaryService.getDictionary(this.dictType).subscribe(ret => {
            this.localStorageService.store('loading.ai-dict-' + this.dictType, false); // 标记请求已经结束
            if (ret && ret.page_data && ret.page_data.length) {
                this.list = ret.page_data;
                this.list.forEach(item => {
                    this.map.set('' + item.param_no, item.param_name);
                });
                this.localStorageService.store('ai-dict-' + this.dictType, this.list); // 存到本地缓存
                this.dictDesc = this.extracted(val);
                this.inited = true;
            }
        });
    }

    private extracted(val) {
        let con = '';
        let valAry = [];
        if (val && typeof val === 'string' && val.indexOf(',') >= 0) {
            valAry = val.split(',');
        }
        if (valAry && valAry.length) {
            valAry.forEach(r => {
                con += ',' + this.map.get('' + r);
            });
            if (con) {
                con = con.substring(1);
            }
        } else {
            con = this.map.get('' + val);
        }
        return con;
    }
}