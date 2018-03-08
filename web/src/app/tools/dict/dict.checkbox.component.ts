import {Component, OnInit, DoCheck, Input, Output, EventEmitter} from '@angular/core';
import {DictionaryService} from 'app/system/dictionary';
import {LocalStorageService} from 'ng2-webstorage';
@Component({
    selector: 'ai-dict-checkbox',
    templateUrl: './dict.checkbox.component.html',
})
export class DictCheckboxComponent implements OnInit, DoCheck {

    @Input() obj;
    @Input() fieldName; // 属性名
    @Input() conFieldName; // 中文内容属性名
    @Input() dictType; // 数据字典类型
    @Input() name;
    @Output() onChange = new EventEmitter();

    list = [];
    checkbox;
    inited = false;
    lastVal; // 上一次的值

    constructor(private dictionaryService: DictionaryService, private localStorageService: LocalStorageService) {
    }
    ngOnInit(): void {
        this.initDate();
    }

    ngDoCheck() {
        if (this.inited) {
            let res = this.obj[this.fieldName];
            if (this.lastVal === res) {
                return;
            }
            this.lastVal = res;
            if (this.list && this.list.length) {
                this.list.forEach(item => {
                    this.checkbox['' + item.param_no] = false;
                });
                this.extracted(res);
            }
        }
    }

    initDate() {
        let res = this.obj[this.fieldName];
        this.lastVal = res;
        this.checkbox = {};
        // 先从本地缓存拿
        let local_data = this.localStorageService.retrieve('ai-dict-' + this.dictType);
        if (local_data && local_data.length) {
            this.list = local_data;
            this.list.forEach(item => {
                this.checkbox['' + item.param_no] = false;
            });
            this.extracted(res);
            this.inited = true;
            return;
        }
        this.dictionaryService.getDictionary(this.dictType).subscribe(ret => {
            if (ret && ret.page_data && ret.page_data.length) {
                this.list = ret.page_data;
                this.list.forEach(item => {
                    this.checkbox['' + item.param_no] = false;
                });
                this.localStorageService.store('ai-dict-' + this.dictType, this.list); // 存到本地缓存
                this.extracted(res);
            }
            this.inited = true;
        });
    }

    private extracted(res: any) {
        let resAry = res ? res.split(',') : [];
        if (resAry && resAry.length) {
            resAry.forEach(r => {
                this.checkbox['' + r] = true;
            });
        }
    }

    _onChange() {
        let res = '';
        let con = '';
        this.list.forEach(item => {
            if (this.checkbox['' + item.param_no]) {
                res += ',' + item.param_no;
                con += ',' + item.param_name;
            }
        });
        if (res) {
            res = res.substring(1);
            con = con.substring(1);
        }
        this.obj[this.fieldName] = res;
        if (this.conFieldName) {
            this.obj[this.conFieldName] = con;
        }
        this.onChange.emit(res);
    }
}