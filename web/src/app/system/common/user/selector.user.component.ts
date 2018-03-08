import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {UserService} from 'app/system/user';
import {SelectorOrg} from 'app/system/common/org/selector.org.module';

@Component({
    selector: 'ai-selector-org-user',
    templateUrl: './selector.user.component.html'
})
export class SelectorUserComponent implements OnInit {

    @Input() checkbox = false;
    @Input() needButton = false;
    @Output() onSubmit = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    currentOrg = new SelectorOrg();

    constructor(private userService: UserService) {
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