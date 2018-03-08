import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectorFun} from './fun.selector.component';
@Component({
    selector: 'ai-system-fun-selector-tree',
    templateUrl: './fun.selector.tree.component.html'
})
export class FunSelectorTreeComponent implements OnInit {
    @Input() funTree: SelectorFun[] = [];
    @Input() checkbox = false;
    @Input() selectedItem: SelectorFun;
    @Output() onSelect = new EventEmitter();
    @Output() onCheck = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    _onSelect(item): void {
        this.onSelect.emit(item);
    }

    _onCheck(item): void {
        this.onCheck.emit(item);
        if (item.children && item.children.length) {
            this.pass2children(item);
        }
    }

    pass2children(item) {
        item.children.forEach(child => {
            if (child.checked !== item.checked) {
                child.checked = item.checked;
                this.onCheck.emit(child);
                if (child.children && child.children.length) {
                    this.pass2children(child);
                }
            }
        });
    }

    _onChildCheck(childItem, item): void {
        // checkox模式下，如果子节点勾选情况发生变化，父节点也要跟着发生变化
        // 如果子节点没有一个被选中，那么父节点要被取消勾选
        // 如果子节点有一个被选中，父节点也要被选择
        if (this.checkbox) {
            let item_new_checked = false;
            item.children.forEach(child => {
                if (child.checked) {
                    item_new_checked = true;
                }
            });
            // 父节点的勾选状态发生变化，也要传递回去
            if (item_new_checked !== item.checked) {
                item.checked = item_new_checked;
                this.onCheck.emit(item);
            }
        }
        // 子节点传递
        this.onCheck.emit(childItem);
    }
}