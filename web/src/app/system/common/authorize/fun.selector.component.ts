import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SessionStorageService} from 'ng2-webstorage';
import {FunService, SysFun} from 'app/system/fun';
@Component({
    selector: 'ai-system-fun-selector',
    templateUrl: './fun.selector.component.html',
    styleUrls: ['./fun.selector.scss']
})
export class FunSelectorComponent implements OnInit {
    @Input() checkbox = false;
    @Input() needButton = false;
    @Input() funTree: SelectorFun[] = [];
    @Output() onSubmit = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    keyword = '';
    orgOpened = true;
    currentItem: SelectorFun;

    checkedItems = [];
    checkedItemsMap = new Map<number, SelectorFun>();

    constructor(private funService: FunService, private sessionStorage: SessionStorageService) {
    }

    ngOnInit(): void {
        if (!this.funTree || !this.funTree.length) {
            this.getAllFuns();
        } else if (this.checkbox) {
            this.initMap(this.funTree);
        }
    }

    initMap(list) {
        list.forEach(item => {
            if (item.checked) {
                this.checkedItemsMap.set(item.func_id, item);
                if (item.children && item.children.length) {
                    this.initMap(item.children);
                }
            }
        });
    }

    getAllFuns() {
        this.funTree = [];
        // 优先从本地缓存获取
        let local_funs = this.sessionStorage.retrieve('ai-fun-valid');
        if (local_funs && local_funs.length) {
            this.funTree = this.funService.buildFunTree(local_funs);
            return;
        }
        this.funService.getAllFuns(1).subscribe(ret => {
            if (ret && ret.length) {
                this.sessionStorage.store('ai-fun-valid', ret);
                this.funTree = this.funService.buildFunTree(ret);
                this.initMap(this.funTree);
            }
        });
    }

    searchFuns() {
        if (this.funTree && this.funTree.length) {
            this.funService.searchFuns(this.funTree, this.keyword);
        }
    }

    _onSelectItem(item) {
        this.currentItem = item;
        if (this.needButton) {
            return;
        }
        this._onsubmit();
    }

    _onCheck(item) {
        console.log(item.func_id);
        if (item.checked) {
            this.checkedItemsMap.set(item.func_id, item);
        }
        if (!item.checked && this.checkedItemsMap.has(item.func_id)) {
            this.checkedItemsMap.delete(item.func_id);
        }
    }

    _onsubmit() {
        if (this.checkbox) {
            this.checkedItems = [];
            this.checkedItemsMap.forEach((v, k, m) => {
                this.checkedItems.push(v);
            });
            this.onSubmit.emit(this.checkedItems);
        } else {
            this.onSubmit.emit(this.currentItem);
        }
    }

    _onCancel() {
        this.onCancel.emit(1);
    }
}
export class SelectorFun extends SysFun {
    checked: boolean;
}