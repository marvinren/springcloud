import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Dictionary} from './dictionary';
@Component({
    selector: 'ai-system-dictionary-tree',
    templateUrl: './dictionary.tree.component.html',
    styleUrls: ['./dictionary.tree.scss']
})
export class DictionaryTreeComponent implements OnInit {
    @Input() dictionaryTree: Dictionary[] = [];
    @Input() readonly = true;
    @Output() onSelect = new EventEmitter();
    @Output() onSelectMenu = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    _onSelect(event): void {
        this.onSelect.emit(event);
    }

    _onSelectMenu(event): void {
        this.onSelectMenu.emit(event);
    }
}