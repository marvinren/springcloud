import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectorOrg} from 'app/system/common/org/selector.org.module';
@Component({
    selector: 'ai-authorize-org-tree',
    templateUrl: './authorize.org.tree.component.html'
})
export class AuthorizOrgTreeComponent implements OnInit {
    @Input() orgTree: SelectorOrg[] = [];
    @Input() checkbox = false;
    @Input() selectedItem: SelectorOrg;
    @Output() onSelect = new EventEmitter();
    @Output() onCheck = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    _onSelect(event): void {
        this.onSelect.emit(event);
    }

    _onCheck(event): void {
        console.dir(event);
        this.onCheck.emit(event);
    }
}