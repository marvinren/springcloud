import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataroleService} from 'app/system/datarole';
import {SelectorOrg} from 'app/system/common/org/selector.org.module';
@Component({
    selector: 'ai-system-datarole-selector',
    templateUrl: './datarole.selector.component.html'
})
export class DataroleSelectorComponent implements OnInit {
    @Input() checkbox = false;
    @Input() needButton = false;
    @Output() onSubmit = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    currentOrg = new SelectorOrg();

    constructor(private dataroleService: DataroleService) {
    }

    onSelectOrg(org) {
        this.currentOrg = org;
    }

    ngOnInit() {
    }

    _onSubmit(event) {
        this.onSubmit.emit(event);
    }

    _onCancel(event) {
        this.onCancel.emit(event);
    }

}