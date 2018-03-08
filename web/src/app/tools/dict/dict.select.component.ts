import {Component, OnInit, DoCheck, Input, Output, EventEmitter} from '@angular/core';
import {DictionaryService} from 'app/system/dictionary';
import {LocalStorageService} from 'ng2-webstorage';
@Component({
    selector: 'ai-dict-select',
    templateUrl: './dict.select.component.html',
})
export class DictSelectComponent implements OnInit, DoCheck {

    @Input() obj; // 主体对象
    @Input() fieldName; // 需要关联的属性
    @Input() conFieldName; // 主体对象里需要赋值中文内容的属性
    @Input() dictType; // 数据字典类型
    @Output() onChange = new EventEmitter();
    @Input() name = 'sel_' + Math.floor(Math.random() * 10000);
    @Input() required = false;  // 是否必填
    list = [];
    map = new Map();
    selectItem; // 下拉框绑定
    inited = false;
    lastVal; // 上一次的值

    constructor(private dictionaryService: DictionaryService, private localStorage: LocalStorageService) {
    }

    ngOnInit(): void {
        this.initDate();
    }

    ngDoCheck() {
        if (this.inited) {
            this.selectItem = this.obj[this.fieldName] !== null && this.obj[this.fieldName] !== undefined ? '' + this.obj[this.fieldName] : '';
            if (this.lastVal === this.selectItem) {
                return;
            }
            this.lastVal = this.selectItem;
            if (this.conFieldName) {
                let con = this.map.get(this.selectItem);
                this.obj[this.conFieldName] = con;
            }
        }
    }

    initDate() {
        this.selectItem = this.obj[this.fieldName] !== null && this.obj[this.fieldName] !== undefined ? '' + this.obj[this.fieldName] : '';
        this.lastVal = this.selectItem;
        // 先从本地缓存拿
        let local_data = this.localStorage.retrieve('ai-dict-' + this.dictType);
        if (local_data && local_data.length) {
            this.list = local_data;
            // 将编号、名称放入map中
            this.list.forEach(item => {
                this.map.set('' + item.param_no, item.param_name);
            });
            this.inited = true;
            return;
        }
        this.dictionaryService.getDictionary(this.dictType).subscribe(ret => {
            if (ret && ret.page_data && ret.page_data.length) {
                this.list = ret.page_data;
                // 将编号、名称放入map中
                this.list.forEach(item => {
                    this.map.set('' + item.param_no, item.param_name);
                });
                // 存入缓存方便下次使用
                this.localStorage.store('ai-dict-' + this.dictType, this.list); // 存到本地缓存
            }
            this.inited = true;
        });
    }

    // 页面下拉框选取后时触发
    _onChange() {
        this.obj[this.fieldName] = this.selectItem; // 赋值编号
        // 赋值中文内容
        if (this.conFieldName) {
            let con = this.map.get(this.selectItem); // 从map中快速获取中文名
            this.obj[this.conFieldName] = con;
        }
        this.onChange.emit(this.selectItem);
    }
}