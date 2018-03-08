import {Component, OnInit, Input} from '@angular/core';
@Component({
    selector: 'ai-demand-edit-attach',
    templateUrl: './demand.edit.attach.component.html',
    styleUrls: ['./demand.edit.attach.scss']
})
export class DemandEditAttachComponent implements OnInit {
    selectedAllFlag = false;
    attachList = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleSelectAll() {
        if (this.attachList && this.attachList.length) {
            let i = 0;
            for (i = 0; i < this.attachList.length; i++) {
                this.attachList[i].checked = this.selectedAllFlag;
            }
        }
    }
}