import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {OrgService} from 'app/system/org';
import {SessionStorageService} from 'ng2-webstorage';
import {SelectorOrg} from 'app/system/common/org/selector.org.module';
@Component({
    selector: 'ai-authroize-org',
    templateUrl: './authroize.org.component.html',
    styleUrls: ['../org/selector.org.scss']
})
export class AuthroizeOrgComponent implements OnInit {
    @Input() checkbox = false;
    @Input() needButton = false;
    @Output() onSubmit = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    orgKeyword = '';
    orgTree: SelectorOrg[] = [];
    orgOpened = true;
    currentOrg: SelectorOrg;

    checkedOrgs = [];
    checkedOrgsMap = new Map<number, SelectorOrg>();

    constructor(private orgService: OrgService, private sessionStorage: SessionStorageService) {
    }

    ngOnInit(): void {
        this.getAllOrgs();
    }

    getAllOrgs() {
        this.orgTree = [];
        // 优先从本地缓存获取
        let local_orgs = this.sessionStorage.retrieve('ai-organize-valid');
        if (local_orgs && local_orgs.length) {
            this.orgTree = this.orgService.buildOrgTree(local_orgs);
            return;
        }
        this.orgService.getAllOrgs(1).subscribe(ret => {
            if (ret && ret.length) {
                this.sessionStorage.store('ai-organize-valid', ret);
                this.orgTree = this.orgService.buildOrgTree(ret);
            }
        });
    }

    searchOrgs() {
        if (this.orgTree && this.orgTree.length) {
            this.orgService.searchOrgs(this.orgTree, this.orgKeyword);
        }
    }

    _onSelectOrg(org) {
        this.currentOrg = org;
        if (this.needButton) {
            return;
        }
        this._onsubmit();
    }

    _onCheckChange(org) {
        if (org.checked && !this.checkedOrgsMap.has(org.organize_id)) {
            this.checkedOrgs.push(org);
            this.checkedOrgsMap.set(org.organize_id, org);
        }
    }

    _onsubmit() {
        if (this.checkbox) {
            this.onSubmit.emit(this.checkedOrgs);
        } else {
            this.onSubmit.emit(this.currentOrg);
        }
    }

    _onCancel() {
        this.onCancel.emit(1);
    }
}
