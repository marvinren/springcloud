import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {UploadService} from 'app/demand/edit/upload.service';
@Component({
    selector: 'ai-demand-edit-attach',
    templateUrl: './demand.edit.attach.component.html',
    styleUrls: ['./demand.edit.attach.scss']
})
export class DemandEditAttachComponent implements OnInit {
    selectedAllFlag = false;
    attachList = [];

    constructor(private uploadService: UploadService) {
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
    upload() {

    }
}