import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {OrgtypeService} from 'app/system/orgtype';
import {SessionStorageService} from 'ng2-webstorage';
import {Organize} from 'app/system/org';
@Component({
    templateUrl: './org.type.component.html',
    selector: 'ai-system-org-type',

})
export class OrgTypeComponent implements OnInit {
    @Input() org = new Organize();
    orgtypelist = [];
    pagination = {
        page_no: 1,
        page_size: 100
    };
    selectedVal;


    constructor(private orgtypeService: OrgtypeService, private sessionStorageService: SessionStorageService) {
        this.getOrgTypeList();
    }

    ngOnInit(): void {
        this.selectedVal = this.org.org_type;
    }

    getOrgTypeList() {
        this.orgtypelist = [];
        let sessionList = this.sessionStorageService.retrieve('ai-system-org-type');
        if (sessionList && sessionList.length) {
            this.orgtypelist = sessionList;
            return;
        }
        this.orgtypeService.getOrgtypePage(this.pagination).subscribe(ret => {
            if (ret && ret.page_data) {
                this.orgtypelist = ret.page_data;
                this.sessionStorageService.store('ai-system-org-type', this.orgtypelist);
            }
        });
    }

    onChange() {
        this.org.org_type = Number(this.selectedVal);
    }
}



