import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SysFun} from './fun';
@Component({
    selector: 'ai-system-fun-tree',
    templateUrl: './fun.tree.component.html',
    styleUrls: ['./fun.tree.scss']
})
export class FunTreeComponent implements OnInit {
    @Input() funTree: SysFun[] = [];
    @Output() onSelectMenu = new EventEmitter();
    @Output() onSelect = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    _onSelectMenu(event) {
        this.onSelectMenu.emit(event);
    }

    _ononSelect(event) {
        this.onSelect.emit(event);
    }

}